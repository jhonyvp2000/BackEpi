import IndicadoresClient from './IndicadoresClient';
import { db } from '@/db/index';
import { monthlyIndicators } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';

export default async function IndicadoresPage() {
    // Rendimiento Hora Médico
    const recordsRendimiento = await db.select()
        .from(monthlyIndicators)
        .where(eq(monthlyIndicators.tab, 'rendimiento'))
        .orderBy(desc(monthlyIndicators.createdAt));

    const dataRendimiento = recordsRendimiento.map((record: any) => ({
        id: record.id,
        mes: record.month,
        anio: record.year,
        documento: record.documentUrl,
        fechaSubida: format(record.createdAt, 'dd-MM-yyyy')
    }));

    // Análisis de Indicadores Hospitalarios
    const recordsAnalisis = await db.select()
        .from(monthlyIndicators)
        .where(eq(monthlyIndicators.tab, 'analisis'))
        .orderBy(desc(monthlyIndicators.createdAt));

    const dataAnalisis = recordsAnalisis.map((record: any) => ({
        id: record.id,
        mes: record.month,
        anio: record.year,
        documento: record.documentUrl,
        fechaSubida: format(record.createdAt, 'dd-MM-yyyy')
    }));

    return (
        <IndicadoresClient
            dataRendimiento={dataRendimiento}
            dataAnalisis={dataAnalisis}
        />
    );
}
