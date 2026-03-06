'use server';

import { db } from '@/db/index';
import { weeklySituational } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

export async function saveWeeklySituational(formData: FormData) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return { success: false, error: 'No autorizado. Por favor inicie sesión.' };
        }

        const createdBy = (session.user as any).dni || 'unknown';

        const tab = formData.get('tab') as string; // 'metaxenicas' | 'materno' | 'respiratorio'
        const weekNumber = parseInt(formData.get('weekNumber') as string);
        const year = parseInt(formData.get('year') as string);

        let documentUrl: string | null = null;

        const file = formData.get('documentFile') as File | null;
        if (!file || file.size === 0 || file.name === 'undefined') {
            return { success: false, error: 'Debe adjuntar un archivo PDF.' };
        }

        try {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Generate distinct filename
            const fileExt = file.name.split('.').pop() || 'pdf';
            const fileName = `salasituacional-${tab}-SE${weekNumber}-${year}-${Date.now()}.${fileExt}`;

            const { data, error: uploadError } = await supabase.storage
                .from('indicadoresboletinesepidemiologicos')
                .upload(fileName, buffer, {
                    contentType: file.type,
                    upsert: true
                });

            if (uploadError) {
                console.error("Supabase Upload Error:", uploadError);
                throw new Error("Error al subir el archivo a Supabase Storage");
            }

            const { data: urlData } = supabase.storage
                .from('indicadoresboletinesepidemiologicos')
                .getPublicUrl(fileName);

            documentUrl = urlData.publicUrl;
        } catch (error) {
            console.error("File processing error:", error);
            return { success: false, error: 'Ocurrió un error procesando el archivo adjunto.' };
        }

        // Buscamos si ya existe la semana para sobrescribir o crear nuevo
        const existing = await db.select().from(weeklySituational)
            .where(and(
                eq(weeklySituational.tab, tab),
                eq(weeklySituational.weekNumber, weekNumber),
                eq(weeklySituational.year, year)
            ));

        if (existing.length > 0) {
            // Actualizar existente
            await db.update(weeklySituational)
                .set({ documentUrl, createdBy, createdAt: new Date() })
                .where(eq(weeklySituational.id, existing[0].id));
        } else {
            // Insertar nuevo
            await db.insert(weeklySituational).values({
                tab,
                weekNumber,
                year,
                documentUrl,
                createdBy,
            });
        }

        revalidatePath('/sala-situacional');

        return { success: true };
    } catch (error: any) {
        console.error('Error saving weekly situational:', error);
        return { success: false, error: error.message || 'Error interno del servidor.' };
    }
}
