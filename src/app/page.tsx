import { getLatestIndicators } from '@/app/actions/indicadores';
import DashboardClient from './DashboardClient';

// Forzamos el renderizado dinámico para tener siempre datos frescos
export const dynamic = 'force-dynamic';

export default async function Home() {
  const result = await getLatestIndicators();
  let latestData = {
    consultasHoy: '0',
    emergenciasHoy: '0',
    ocupacionHoy: '0',
  };

  if (result.success && result.data && result.data.length > 0) {
    const today = result.data[0];
    latestData = {
      consultasHoy: today.outpatientConsultations?.toString() || '0',
      emergenciasHoy: today.emergencyAttendances?.toString() || '0',
      ocupacionHoy: today.occupancyRate?.toString() || '0',
    };
  }

  return <DashboardClient stats={latestData} />;
}
