'use server';

import { db } from '@/db/index';
import { monthlyBulletins } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

export async function saveMonthlyBulletin(formData: FormData) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return { success: false, error: 'No autorizado. Por favor inicie sesión.' };
        }

        const createdBy = (session.user as any).dni || 'unknown';

        const tab = formData.get('tab') as string; // 'epidemiologico' | 'infecciones' | 'estadistico'
        const month = formData.get('mes') as string;
        const year = parseInt(formData.get('anio') as string);

        let documentUrl: string | null = null;

        const file = formData.get('boletinFile') as File | null;
        if (!file || file.size === 0 || file.name === 'undefined') {
            return { success: false, error: 'Debe adjuntar un archivo PDF.' };
        }

        try {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Name format: boletin-tab-month-year-timestamp.pdf
            const fileExt = file.name.split('.').pop() || 'pdf';
            const fileName = `boletin-${tab}-${month}-${year}-${Date.now()}.${fileExt}`;

            // We use the same bucket "indicadoresboletinesepidemiologicos" as instructed
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
            return { success: false, error: 'Ocurrió un error procesando el archivo PDF adjunto.' };
        }

        // Buscamos si ya existe el boletín para ese mes y año y tab, para sobrescribir o crear
        const existing = await db.select().from(monthlyBulletins)
            .where(and(
                eq(monthlyBulletins.tab, tab),
                eq(monthlyBulletins.month, month),
                eq(monthlyBulletins.year, year)
            ));

        if (existing.length > 0) {
            // Actualizar existente
            await db.update(monthlyBulletins)
                .set({ documentUrl, createdBy, createdAt: new Date() })
                .where(eq(monthlyBulletins.id, existing[0].id));
        } else {
            // Insertar nuevo registro
            await db.insert(monthlyBulletins).values({
                tab,
                month,
                year,
                documentUrl,
                createdBy,
            });
        }

        revalidatePath('/boletines');

        return { success: true };
    } catch (error: any) {
        console.error('Error saving monthly bulletin:', error);
        return { success: false, error: error.message || 'Error interno del servidor.' };
    }
}
