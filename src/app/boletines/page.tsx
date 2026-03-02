'use client';

import { useState } from 'react';
import { FileText, Plus, Search, Filter, MoreHorizontal, FileDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BoletinesPage() {
    const [boletines] = useState([
        { id: 1, volumen: 'Vol. 45', titulo: 'Boletín Epidemiológico SE 45 - 2026', fecha: '2026-11-04', descargas: 124 },
        { id: 2, volumen: 'Vol. 44', titulo: 'Boletín Epidemiológico SE 44 - 2026', fecha: '2026-10-28', descargas: 89 },
        { id: 3, volumen: 'Vol. 43', titulo: 'Boletín Epidemiológico SE 43 - 2026', fecha: '2026-10-21', descargas: 156 },
    ]);

    return (
        <div className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto w-full">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                    <FileText className="w-8 h-8 text-emerald-500" />
                    Boletines Epidemiológicos
                </h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition"
                >
                    <Plus className="w-4 h-4 mr-2" /> Subir Boletín
                </motion.button>
            </div>

            <div className="flex space-x-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        placeholder="Buscar por volumen o título..."
                        className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-9 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:border-slate-800 dark:bg-slate-900 dark:text-white transition"
                    />
                </div>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 border border-slate-300 bg-white dark:bg-slate-900 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                    <Filter className="w-4 h-4 mr-2" /> Filtros
                </button>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl border border-slate-200 bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
            >
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b border-slate-200 dark:border-slate-800 bg-emerald-50/30 dark:bg-emerald-900/10">
                            <tr className="border-b transition-colors">
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400 w-[100px]">Volumen</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Título / Descripción</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Fecha Publicación</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Descargas</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400 w-[100px]">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {boletines.map((boletin, index) => (
                                <motion.tr
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    key={boletin.id}
                                    className="border-b border-slate-100 dark:border-slate-800 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30 group"
                                >
                                    <td className="p-4 align-middle font-medium">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                                <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <span className="text-slate-900 dark:text-white font-semibold">{boletin.volumen}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle text-slate-900 dark:text-slate-100">
                                        {boletin.titulo}
                                    </td>
                                    <td className="p-4 align-middle text-slate-600 dark:text-slate-400">{boletin.fecha}</td>
                                    <td className="p-4 align-middle">
                                        <span className="inline-flex items-center text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-medium">
                                            <FileDown className="w-3 h-3 mr-1" />
                                            {boletin.descargas}
                                        </span>
                                    </td>
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
