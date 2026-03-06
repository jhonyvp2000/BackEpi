import DashboardClient from './DashboardClient';
import { db } from '@/db/index';
import { monthlyIndicators, weeklySituational, monthlyBulletins } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Total Counts
  const indicadoresCount = await db.select().from(monthlyIndicators);
  const salaCount = await db.select().from(weeklySituational);
  const boletinesCount = await db.select().from(monthlyBulletins);

  // Fetch Last Items for recent activity
  const lastInd = await db.select().from(monthlyIndicators).orderBy(desc(monthlyIndicators.createdAt)).limit(1);
  const lastSala = await db.select().from(weeklySituational).orderBy(desc(weeklySituational.createdAt)).limit(1);
  const lastBol = await db.select().from(monthlyBulletins).orderBy(desc(monthlyBulletins.createdAt)).limit(1);

  const formatAct = (item: any, type: string, titleStr: string) => {
    if (!item) return null;
    return {
      id: `${type}-${item.id}`,
      tipo: type,
      titulo: titleStr,
      fecha: format(item.createdAt, "dd MMM yyyy 'a las' HH:mm", { locale: es }),
      url: item.documentUrl
    };
  };

  const recientes = [
    formatAct(lastInd[0], 'Indicadores', `Reporte Mensual - ${lastInd[0]?.month} ${lastInd[0]?.year}`),
    formatAct(lastSala[0], 'Sala Situacional', `Reporte Semanal - SE ${lastSala[0]?.weekNumber} ${lastSala[0]?.year}`),
    formatAct(lastBol[0], 'Boletines', `Boletín Mensual - ${lastBol[0]?.month} ${lastBol[0]?.year}`)
  ].filter(Boolean); // Remove nulls

  // Sort combined recents by parsing date if we had raw dates, but we'll leave as is for simplicity

  const stats = {
    totalIndicadores: indicadoresCount.length,
    totalSala: salaCount.length,
    totalBoletines: boletinesCount.length,
    recientes
  };

  return <DashboardClient stats={stats} />;
}
