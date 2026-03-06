'use client';

import { useState } from 'react';
import { FileText, Plus, Download, ShieldAlert, BarChart3, FlaskConical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BoletinesModal } from '@/components/BoletinesModal';

export default function BoletinesClient({ dataEpi, dataIaas, dataEstadisticos }: any) {
    const [activeTab, setActiveTab] = useState('epidemiologico'); // 'epidemiologico' | 'infecciones' | 'estadistico'
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getActiveData = () => {
        if (activeTab === 'epidemiologico') return dataEpi;
        if (activeTab === 'infecciones') return dataIaas;
        return dataEstadisticos;
    };

    const getButtonColor = () => {
        if (activeTab === 'epidemiologico') return 'bg-emerald-600 hover:bg-emerald-700';
        if (activeTab === 'infecciones') return 'bg-amber-500 hover:bg-amber-600';
        return 'bg-indigo-500 hover:bg-indigo-600';
    };

    const getTabTitle = () => {
        if (activeTab === 'epidemiologico') return 'Subir Boletín Epidemiológico';
        if (activeTab === 'infecciones') return 'Subir Boletín IAAS';
        return 'Subir Boletín Estadístico';
    };

    return (
        <div className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto w-full">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                        <FileText className="w-8 h-8 text-emerald-500" />
                        Boletines Mensuales
                    </h2>
                    <p className="text-slate-500 mt-2">Plataforma de difusión oficial de boletines del Hospital clasificados por especialidad.</p>
                </div>
                <motion.button
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 text-white shadow-sm transition ${getButtonColor()}`}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    {getTabTitle()}
                </motion.button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-800 scrollbar-hide">
                <button
                    onClick={() => setActiveTab('epidemiologico')}
                    className={`flex items-center gap-2 px-6 py-4 font-bold text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === 'epidemiologico' ? 'border-emerald-500 text-emerald-600 bg-emerald-50/50 dark:bg-emerald-900/20' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                >
                    <FlaskConical size={18} /> Epidemiológicos
                </button>
                <button
                    onClick={() => setActiveTab('infecciones')}
                    className={`flex items-center gap-2 px-6 py-4 font-bold text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === 'infecciones' ? 'border-amber-500 text-amber-600 bg-amber-50/50 dark:bg-amber-900/20' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                >
                    <ShieldAlert size={18} /> IAAS
                </button>
                <button
                    onClick={() => setActiveTab('estadistico')}
                    className={`flex items-center gap-2 px-6 py-4 font-bold text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === 'estadistico' ? 'border-indigo-500 text-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                >
                    <BarChart3 size={18} /> Estadísticos
                </button>
            </div>

            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {getActiveData().map((item: any, index: number) => {
                        let borderColor = '';
                        let bgColor = '';
                        let iconColor = '';
                        let badgeBg = '';
                        let btnColor = '';

                        if (activeTab === 'epidemiologico') {
                            borderColor = 'border-emerald-100 dark:border-emerald-900/50 hover:border-emerald-300 dark:hover:border-emerald-700';
                            bgColor = 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-50 dark:border-slate-800';
                            iconColor = 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400';
                            badgeBg = 'bg-emerald-600 text-white';
                            btnColor = 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-slate-800 dark:text-emerald-400 dark:hover:bg-slate-700';
                        } else if (activeTab === 'infecciones') {
                            borderColor = 'border-amber-100 dark:border-amber-900/50 hover:border-amber-300 dark:hover:border-amber-700';
                            bgColor = 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-50 dark:border-slate-800';
                            iconColor = 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400';
                            badgeBg = 'bg-amber-500 text-white';
                            btnColor = 'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-slate-800 dark:text-amber-400 dark:hover:bg-slate-700';
                        } else {
                            borderColor = 'border-indigo-100 dark:border-indigo-900/50 hover:border-indigo-300 dark:hover:border-indigo-700';
                            bgColor = 'bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-50 dark:border-slate-800';
                            iconColor = 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400';
                            badgeBg = 'bg-indigo-500 text-white';
                            btnColor = 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-slate-800 dark:text-indigo-400 dark:hover:bg-slate-700';
                        }

                        return (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05 }}
                                key={item.id}
                                className={`group relative rounded-2xl border bg-white dark:bg-slate-900 overflow-hidden hover:shadow-lg transition-all duration-300 ${borderColor}`}
                            >
                                <div className={`p-6 border-b ${bgColor}`}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`p-2 rounded-lg ${iconColor}`}>
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                                                {item.mes} {item.anio}
                                            </h3>
                                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeBg}`}>
                                                PDF
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                        Subido el: <span className="font-medium text-slate-700 dark:text-slate-300">{item.fechaSubida}</span>
                                    </p>

                                    <a
                                        href={item.documento}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={`w-full flex justify-center items-center px-4 py-2.5 rounded-xl text-sm font-semibold transition ${btnColor}`}
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Ver Boletín
                                    </a>
                                </div>
                            </motion.div>
                        );
                    })}

                    {getActiveData().length === 0 && (
                        <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-full mb-4">
                                <FileText className="w-10 h-10 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No hay boletines disponibles</h3>
                            <p className="text-slate-500 max-w-sm">No se han registrado reportes para esta categoría aún. Comienza subiendo el primer informe del mes.</p>
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>

            <BoletinesModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                activeTab={activeTab}
            />
        </div>
    );
}
