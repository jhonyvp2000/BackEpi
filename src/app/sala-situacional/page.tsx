import SalaSituacionalClient from './SalaSituacionalClient';
import { db } from '@/db/index';
import { weeklySituational } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';

export default async function SalaSituacionalPage() {
    // 1. Metaxénicas
    const recordsMetaxenicas = await db.select()
        .from(weeklySituational)
        .where(eq(weeklySituational.tab, 'metaxenicas'))
        .orderBy(desc(weeklySituational.createdAt));

    const dataMetaxenicas = recordsMetaxenicas.map((record: any) => ({
        id: record.id,
        semana: record.weekNumber,
        anio: record.year,
        documento: record.documentUrl,
        fechaSubida: format(record.createdAt, 'dd-MM-yyyy')
    }));

    // 2. Materno Neonatal
    const recordsMaterno = await db.select()
        .from(weeklySituational)
        .where(eq(weeklySituational.tab, 'materno'))
        .orderBy(desc(weeklySituational.createdAt));

    const dataMaterno = recordsMaterno.map((record: any) => ({
        id: record.id,
        semana: record.weekNumber,
        anio: record.year,
        documento: record.documentUrl,
        fechaSubida: format(record.createdAt, 'dd-MM-yyyy')
    }));

    // 3. V. Respiratoria
    const recordsRespiratorio = await db.select()
        .from(weeklySituational)
        .where(eq(weeklySituational.tab, 'respiratorio'))
        .orderBy(desc(weeklySituational.createdAt));

    const dataRespiratorio = recordsRespiratorio.map((record: any) => ({
        id: record.id,
        semana: record.weekNumber,
        anio: record.year,
        documento: record.documentUrl,
        fechaSubida: format(record.createdAt, 'dd-MM-yyyy')
    }));

    return (
        <SalaSituacionalClient
            dataMetaxenicas={dataMetaxenicas}
            dataMaterno={dataMaterno}
            dataRespiratorio={dataRespiratorio}
        />
    );
}
