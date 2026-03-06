'use client';

import { useState } from 'react';
import { ActivitySquare, Plus, FileText, Download, Clock, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { IndicadoresModal } from '@/components/IndicadoresModal';

export default function IndicadoresClient({ dataRendimiento, dataAnalisis }: any) {
    const [activeTab, setActiveTab] = useState('rendimiento');
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto w-full">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                        <ActivitySquare className="w-8 h-8 text-[var(--color-hospital-blue)]" />
                        Indicadores Hospitalarios Mensuales
                    </h2>
                    <p className="text-slate-500 mt-2">Repositorio oficial de análisis de rendimiento y estudios estadísticos del Hospital.</p>
                </div>
                <motion.button
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 text-white shadow-sm transition ${activeTab === 'rendimiento' ? 'bg-[var(--color-hospital-blue)] hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700'}`}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    {activeTab === 'rendimiento' ? 'Subir Rendimiento Hora Médico' : 'Subir Análisis de Indicadores'}
                </motion.button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-800 scrollbar-hide">
                <button
                    onClick={() => setActiveTab('rendimiento')}
                    className={`flex items-center gap-2 px-6 py-4 font-bold text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === 'rendimiento' ? 'border-[var(--color-hospital-blue)] text-[var(--color-hospital-blue)] bg-blue-50/50 dark:bg-blue-900/20' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                >
                    <Clock size={18} /> Rendimiento de Hora Médico
                </button>
                <button
                    onClick={() => setActiveTab('analisis')}
                    className={`flex items-center gap-2 px-6 py-4 font-bold text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === 'analisis' ? 'border-purple-500 text-purple-600 bg-purple-50/50 dark:bg-purple-900/20' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                >
                    <BarChart2 size={18} /> Análisis de Indicadores Hospitalarios
                </button>
            </div>

            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {(activeTab === 'rendimiento' ? dataRendimiento : dataAnalisis).map((item: any, index: number) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: index * 0.05 }}
                            key={item.id}
                            className={`group relative rounded-2xl border bg-white dark:bg-slate-900 overflow-hidden hover:shadow-lg transition-all duration-300 ${activeTab === 'rendimiento' ? 'border-blue-100 hover:border-blue-300 dark:border-blue-900 dark:hover:border-blue-700' : 'border-purple-100 hover:border-purple-300 dark:border-purple-900 dark:hover:border-purple-700'}`}
                        >
                            <div className={`p-6 border-b ${activeTab === 'rendimiento' ? 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-50 dark:border-slate-800' : 'bg-purple-50/50 dark:bg-purple-900/10 border-purple-50 dark:border-slate-800'}`}>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`p-2 rounded-lg ${activeTab === 'rendimiento' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' : 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400'}`}>
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                                            {item.mes} {item.anio}
                                        </h3>
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${activeTab === 'rendimiento' ? 'bg-[var(--color-hospital-blue)] text-white' : 'bg-purple-600 text-white'}`}>
                                            PDF
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    Subido el: <span className="font-medium text-slate-700 dark:text-slate-300">{item.fechaSubida}</span>
                                </p>

                                <a
                                    href={item.documento}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`w-full flex justify-center items-center px-4 py-2.5 rounded-xl text-sm font-semibold transition ${activeTab === 'rendimiento' ? 'bg-blue-50 text-[var(--color-hospital-blue)] hover:bg-blue-100 dark:bg-slate-800 dark:text-blue-400 dark:hover:bg-slate-700' : 'bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-slate-800 dark:text-purple-400 dark:hover:bg-slate-700'}`}
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Descargar Boletín
                                </a>
                            </div>
                        </motion.div>
                    ))}

                    {(activeTab === 'rendimiento' ? dataRendimiento : dataAnalisis).length === 0 && (
                        <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-full mb-4">
                                <FileText className="w-10 h-10 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No hay boletines disponibles</h3>
                            <p className="text-slate-500 max-w-sm">No se han registrado boletines mensuales para esta categoría aún. Comienza subiendo el primer informe.</p>
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>

            <IndicadoresModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                activeTab={activeTab}
            />
        </div>
    );
}
