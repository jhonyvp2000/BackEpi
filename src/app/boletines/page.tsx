import BoletinesClient from './BoletinesClient';
import { db } from '@/db/index';
import { monthlyBulletins } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';

export default async function BoletinesPage() {
    // 1. Boletines Epidemiológicos
    const recordsEpi = await db.select()
        .from(monthlyBulletins)
        .where(eq(monthlyBulletins.tab, 'epidemiologico'))
        .orderBy(desc(monthlyBulletins.createdAt));

    const dataEpi = recordsEpi.map((record: any) => ({
        id: record.id,
        mes: record.month,
        anio: record.year,
        documento: record.documentUrl,
        fechaSubida: format(record.createdAt, 'dd-MM-yyyy')
    }));

    // 2. Infecciones Asociadas a la Atención en Salud (IAAS)
    const recordsIaas = await db.select()
        .from(monthlyBulletins)
        .where(eq(monthlyBulletins.tab, 'infecciones'))
        .orderBy(desc(monthlyBulletins.createdAt));

    const dataIaas = recordsIaas.map((record: any) => ({
        id: record.id,
        mes: record.month,
        anio: record.year,
        documento: record.documentUrl,
        fechaSubida: format(record.createdAt, 'dd-MM-yyyy')
    }));

    // 3. Boletines Estadísticos
    const recordsEstadisticos = await db.select()
        .from(monthlyBulletins)
        .where(eq(monthlyBulletins.tab, 'estadistico'))
        .orderBy(desc(monthlyBulletins.createdAt));

    const dataEstadisticos = recordsEstadisticos.map((record: any) => ({
        id: record.id,
        mes: record.month,
        anio: record.year,
        documento: record.documentUrl,
        fechaSubida: format(record.createdAt, 'dd-MM-yyyy')
    }));

    return (
        <BoletinesClient
            dataEpi={dataEpi}
            dataIaas={dataIaas}
            dataEstadisticos={dataEstadisticos}
        />
    );
}
