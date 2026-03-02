'use client';

import { useState } from 'react';
import { BarChart3, Plus, Search, Filter, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SalaSituacionalPage() {
    const [casos, setCasos] = useState([
        { id: 1, semana: 'SE 45', confirmados: 342, alarma: 45, hospitalizados: 12, fecha: '2026-11-02' },
        { id: 2, semana: 'SE 44', confirmados: 310, alarma: 41, hospitalizados: 10, fecha: '2026-10-26' },
        { id: 3, semana: 'SE 43', confirmados: 285, alarma: 38, hospitalizados: 8, fecha: '2026-10-19' },
    ]);

    return (
        <div className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto w-full">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                    <BarChart3 className="w-8 h-8 text-rose-500" />
                    Sala Situacional Virtual
                </h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-rose-600 text-white hover:bg-rose-700 shadow-sm transition"
                >
                    <Plus className="w-4 h-4 mr-2" /> Nuevo Registro Semanal
                </motion.button>
            </div>

            <div className="flex space-x-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        placeholder="Buscar por semana epid..."
                        className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-9 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent dark:border-slate-800 dark:bg-slate-900 dark:text-white transition"
                    />
                </div>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 border border-slate-300 bg-white dark:bg-slate-900 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                    <Filter className="w-4 h-4 mr-2" /> Filtros
                </button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-slate-200 bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
            >
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Semana Epidemiológica</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Casos Confirmados</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Con Signos de Alarma</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Hospitalizados</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Fecha de Cierre</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400 w-[100px]">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {casos.map((caso, index) => (
                                <motion.tr
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    key={caso.id}
                                    className="border-b border-slate-100 dark:border-slate-800 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30"
                                >
                                    <td className="p-4 align-middle font-medium text-slate-900 dark:text-white">{caso.semana}</td>
                                    <td className="p-4 align-middle">
                                        <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                                            {caso.confirmados}
                                        </span>
                                    </td>
                                    <td className="p-4 align-middle">
                                        <span className="inline-flex items-center rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-semibold text-rose-800 dark:bg-rose-900/30 dark:text-rose-300">
                                            {caso.alarma}
                                        </span>
                                    </td>
                                    <td className="p-4 align-middle text-slate-600 dark:text-slate-400">{caso.hospitalizados}</td>
                                    <td className="p-4 align-middle text-slate-600 dark:text-slate-400">{caso.fecha}</td>
                                    <td className="p-4 align-middle">
                                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition text-slate-500">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
