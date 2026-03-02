'use server';

import { db } from '@/db';
import { dailyIndicators } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function saveIndicator(data: {
    date: string;
    outpatientConsultations: number;
    emergencyAttendances: number;
    occupancyRate: string;
}) {
    try {
        // Check if indicator already exists for this date
        const existing = await db
            .select()
            .from(dailyIndicators)
            .where(eq(dailyIndicators.date, data.date))
            .limit(1);

        if (existing.length > 0) {
            await db
                .update(dailyIndicators)
                .set({
                    outpatientConsultations: data.outpatientConsultations,
                    emergencyAttendances: data.emergencyAttendances,
                    occupancyRate: data.occupancyRate,
                    updatedAt: new Date(),
                })
                .where(eq(dailyIndicators.id, existing[0].id));
        } else {
            await db.insert(dailyIndicators).values({
                date: data.date,
                outpatientConsultations: data.outpatientConsultations,
                emergencyAttendances: data.emergencyAttendances,
                occupancyRate: data.occupancyRate,
                createdBy: 'Admin', // Para futuro: sacar de la sesión
            });
        }

        revalidatePath('/indicadores');
        revalidatePath('/');
        return { success: true };
    } catch (error: any) {
        console.error('Error saving indicator:', error);
        return { success: false, error: 'Error al guardar indicador: ' + error.message };
    }
}

export async function getLatestIndicators() {
    try {
        const records = await db
            .select()
            .from(dailyIndicators)
            .orderBy(desc(dailyIndicators.date))
            .limit(30);
        return { success: true, data: records };
    } catch (error: any) {
        console.error('Error fetching latest indicators:', error);
        return { success: false, data: [] };
    }
}
