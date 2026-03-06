'use server';

import { db } from '@/db/index';
import { monthlyIndicators } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

export async function saveMonthlyIndicator(formData: FormData) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return { success: false, error: 'No autorizado. Por favor inicie sesión.' };
        }

        const createdBy = (session.user as any).dni || 'unknown';

        const tab = formData.get('tab') as string; // 'rendimiento' | 'analisis'
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

            // Generate unique filename (e.g. analisis-Enero-2026-1234.pdf)
            const fileExt = file.name.split('.').pop() || 'pdf';
            const fileName = `${tab}-${month}-${year}-${Date.now()}.${fileExt}`;

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

        // Check if there is already a record for this exact tab, month, and year to either update or duplicate.
        // Usually, monthly records might be updated or a new one created. Let's just create a new one, 
        // but to prevent duplicates of the same month/year per category we can check:
        const existing = await db.select().from(monthlyIndicators)
            .where(and(
                eq(monthlyIndicators.tab, tab),
                eq(monthlyIndicators.month, month),
                eq(monthlyIndicators.year, year)
            ));

        if (existing.length > 0) {
            // Update existing record with new document
            await db.update(monthlyIndicators)
                .set({ documentUrl, createdBy, createdAt: new Date() }) // update time
                .where(eq(monthlyIndicators.id, existing[0].id));
        } else {
            // Insert new record
            await db.insert(monthlyIndicators).values({
                tab,
                month,
                year,
                documentUrl,
                createdBy,
            });
        }

        revalidatePath('/indicadores');

        return { success: true };
    } catch (error: any) {
        console.error('Error saving monthly indicator:', error);
        return { success: false, error: error.message || 'Error interno del servidor.' };
    }
}
