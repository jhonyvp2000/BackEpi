'use client';

import { motion } from 'framer-motion';
import { Activity, BarChart3, Clock, AlertTriangle, FileText, Download, ChevronRight, Stethoscope, BriefcaseMedical } from 'lucide-react';
import Link from 'next/link';

export default function DashboardClient({ stats }: { stats: any }) {
    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Buenos días';
        if (hour < 18) return 'Buenas tardes';
        return 'Buenas noches';
    };

    const totalDocs = stats.totalIndicadores + stats.totalSala + stats.totalBoletines;

    return (
        <div className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto w-full">
            {/* Header / Welcome */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
                    >
                        {greeting()}, Equipo <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-hospital-blue)] to-emerald-500">Epidemiología</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 mt-2 text-lg"
                    >
                        Resumen de actividad y gestión de reportes del hospital.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm"
                >
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Documentos</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalDocs}</p>
                    </div>
                </motion.div>
            </div>

            {/* Main Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                {/* Card 1 */}
                <Link href="/indicadores">
                    <motion.div
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="relative overflow-hidden rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white dark:border-purple-900/30 dark:from-slate-900 dark:to-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
                    >
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div className="p-4 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-2xl group-hover:scale-110 transition-transform">
                                    <Activity className="w-8 h-8" />
                                </div>
                                <div className="text-4xl font-black text-purple-950/10 dark:text-purple-100/5 group-hover:text-purple-950/20 transition-colors">
                                    01
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Indicadores</h3>
                                <p className="text-slate-500 font-medium">{stats.totalIndicadores} reportes mensuales subidos</p>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-400 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </motion.div>
                </Link>

                {/* Card 2 */}
                <Link href="/sala-situacional">
                    <motion.div
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white dark:border-blue-900/30 dark:from-slate-900 dark:to-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
                    >
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div className="p-4 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-2xl group-hover:scale-110 transition-transform">
                                    <BarChart3 className="w-8 h-8" />
                                </div>
                                <div className="text-4xl font-black text-blue-950/10 dark:text-blue-100/5 group-hover:text-blue-950/20 transition-colors">
                                    02
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Sala Situacional</h3>
                                <p className="text-slate-500 font-medium">{stats.totalSala} reportes semanales subidos</p>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </motion.div>
                </Link>

                {/* Card 3 */}
                <Link href="/boletines">
                    <motion.div
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white dark:border-emerald-900/30 dark:from-slate-900 dark:to-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
                    >
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div className="p-4 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-2xl group-hover:scale-110 transition-transform">
                                    <FileText className="w-8 h-8" />
                                </div>
                                <div className="text-4xl font-black text-emerald-950/10 dark:text-emerald-100/5 group-hover:text-emerald-950/20 transition-colors">
                                    03
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Boletines</h3>
                                <p className="text-slate-500 font-medium">{stats.totalBoletines} boletines mensuales subidos</p>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </motion.div>
                </Link>
            </div>

            {/* Recent Activity */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="col-span-2 rounded-3xl border border-slate-200 bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
                >
                    <div className="flex flex-col space-y-1.5 p-6 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="font-bold text-lg leading-none tracking-tight flex items-center gap-2">
                            <Clock className="w-5 h-5 text-slate-400" /> Cargas Recientes
                        </h3>
                    </div>
                    <div className="p-0">
                        {stats.recientes.length === 0 ? (
                            <div className="p-8 text-center text-slate-500">
                                No hay actividad reciente para mostrar.
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {stats.recientes.map((rec: any, index: number) => (
                                    <div key={index} className="flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                                                {rec.tipo === 'Indicadores' ? <Activity className="w-5 h-5" /> :
                                                    rec.tipo === 'Sala Situacional' ? <BarChart3 className="w-5 h-5" /> :
                                                        <FileText className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900 dark:text-white">{rec.titulo}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                                        {rec.tipo}
                                                    </span>
                                                    <span className="text-sm text-slate-500">{rec.fecha}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <a href={rec.url} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-[var(--color-hospital-blue)] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors">
                                            <Download className="w-5 h-5" />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Banner Alerta/Info */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="col-span-1 rounded-3xl border border-transparent bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 shadow-xl overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Stethoscope className="w-32 h-32 text-white" />
                    </div>
                    <div className="p-8 relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-medium backdrop-blur-md border border-white/5 mb-6">
                                <AlertTriangle className="w-3 h-3 text-amber-400" />
                                Sistema Actualizado
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Nuevo Formato Semanal / Mensual</h3>
                            <p className="text-slate-300 font-medium leading-relaxed">
                                El sistema ha sido migrado completamente a la gestión de archivos PDF certificados como repositorio epidemiológico.
                                Las pantallas de ingreso de datos numéricos diarios han sido desactivadas en favor de esta nueva infraestructura centralizada.
                            </p>
                        </div>

                        <div className="mt-8">
                            <Link href="/boletines" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-50 transition-colors shadow-sm">
                                Explorar Boletines
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
