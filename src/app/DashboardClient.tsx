'use client';

import { motion } from 'framer-motion';
import { Activity, BarChart3, Users, Clock, AlertTriangle } from 'lucide-react';

interface StatsProps {
    consultasHoy: string;
    emergenciasHoy: string;
    ocupacionHoy: string;
}

export default function DashboardClient({ stats }: { stats: StatsProps }) {
    const statCards = [
        { name: 'Consultas Externas Hoy', value: stats.consultasHoy, change: '+4.75%', active: true, icon: Users },
        { name: 'Atenciones en Emergencia', value: stats.emergenciasHoy, change: '+12.5%', active: true, icon: Activity },
        { name: 'Ocupación Hospitalaria', value: `${stats.ocupacionHoy}%`, change: '-2.1%', active: false, icon: Clock },
    ];

    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Panel General de Epidemiología
                </h2>
            </div>

            {/* Tarjetas de Resumen */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {statCards.map((stat, i) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        className="rounded-xl border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 text-slate-950 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"
                    >
                        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="tracking-tight text-sm font-medium text-slate-500 dark:text-slate-400">
                                {stat.name}
                            </h3>
                            <stat.icon className="h-4 w-4 text-slate-400" />
                        </div>
                        <div className="p-6 pt-0">
                            <div className="text-3xl font-bold text-[var(--color-hospital-blue)] dark:text-[var(--color-hospital-light)]">
                                {stat.value}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Visualización de última carga disponible.
                            </p>
                        </div>
                        <div className="absolute bottom-0 left-0 h-1 bg-[var(--color-hospital-blue)] w-0 group-hover:w-full transition-all duration-300 ease-in-out" />
                    </motion.div>
                ))}
            </div>

            {/* Secciones de Alertas */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="col-span-4 rounded-xl border border-slate-200 bg-white dark:bg-slate-900 shadow-sm"
                >
                    <div className="flex flex-col space-y-1.5 p-6 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="font-semibold leading-none tracking-tight flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-[var(--color-hospital-blue)]" /> Vigilancia de Dengue
                        </h3>
                        <p className="text-sm text-slate-500">Última Semana Epidemiológica (SE 45)</p>
                    </div>
                    <div className="p-6">
                        <div className="h-[250px] w-full bg-slate-50 dark:bg-slate-800/50 rounded-lg flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-700">
                            <p className="text-slate-400 text-sm italic">Gráfico de Casos en Desarrollo...</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="col-span-3 rounded-xl border border-slate-200 bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
                >
                    <div className="flex flex-col space-y-1.5 p-6 border-b border-slate-100 dark:border-slate-800 bg-rose-50/50 dark:bg-rose-950/20">
                        <h3 className="font-semibold leading-none tracking-tight flex items-center gap-2 text-rose-600 dark:text-rose-400">
                            <AlertTriangle className="w-5 h-5" /> Alertas Críticas Inteligentes
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm hover:bg-slate-50 transition">
                                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Brote de Dengue - Sector Sur</p>
                                        <p className="text-xs text-slate-500">Casos en aumento detectados</p>
                                    </div>
                                    <div className="ml-auto text-xs text-slate-400">hace {2 * i} h</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
