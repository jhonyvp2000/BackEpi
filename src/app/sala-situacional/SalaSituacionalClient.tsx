'use client';

import { useState } from 'react';
import { FileText, Plus, Download, Bug, Baby, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SalaSituacionalModal } from '@/components/SalaSituacionalModal';

export default function SalaSituacionalClient({ dataMetaxenicas, dataMaterno, dataRespiratorio }: any) {
    const [activeTab, setActiveTab] = useState('metaxenicas'); // 'metaxenicas' | 'materno' | 'respiratorio'
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getActiveData = () => {
        if (activeTab === 'metaxenicas') return dataMetaxenicas;
        if (activeTab === 'materno') return dataMaterno;
        return dataRespiratorio;
    };

    const getButtonColor = () => {
        if (activeTab === 'metaxenicas') return 'bg-[var(--color-hospital-blue)] hover:bg-blue-700';
        if (activeTab === 'materno') return 'bg-pink-600 hover:bg-pink-700';
        return 'bg-teal-600 hover:bg-teal-700';
    };

    const getTabTitle = () => {
        if (activeTab === 'metaxenicas') return 'Subir Sala de Metaxénicas';
        if (activeTab === 'materno') return 'Subir Sala Materna';
        return 'Subir Sala Respiratoria';
    };

    return (
        <div className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto w-full">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                        <FileText className="w-8 h-8 text-[var(--color-hospital-blue)]" />
                        Registro de Sala Situacional
                    </h2>
                    <p className="text-slate-500 mt-2">Gestión de boletines epidemiológicos semanales para el portal del Hospital.</p>
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
                    onClick={() => setActiveTab('metaxenicas')}
                    className={`flex items-center gap-2 px-6 py-4 font-bold text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === 'metaxenicas' ? 'border-[var(--color-hospital-blue)] text-blue-600 bg-blue-50/50 dark:bg-blue-900/20' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                >
                    <Bug size={18} /> Metaxénicas
                </button>
                <button
                    onClick={() => setActiveTab('materno')}
                    className={`flex items-center gap-2 px-6 py-4 font-bold text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === 'materno' ? 'border-pink-500 text-pink-600 bg-pink-50/50 dark:bg-pink-900/20' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                >
                    <Baby size={18} /> Materno Neonatal
                </button>
                <button
                    onClick={() => setActiveTab('respiratorio')}
                    className={`flex items-center gap-2 px-6 py-4 font-bold text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === 'respiratorio' ? 'border-teal-500 text-teal-600 bg-teal-50/50 dark:bg-teal-900/20' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                >
                    <Stethoscope size={18} /> V. Respiratoria
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

                        if (activeTab === 'metaxenicas') {
                            borderColor = 'border-blue-100 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700';
                            bgColor = 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-50 dark:border-slate-800';
                            iconColor = 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400';
                            badgeBg = 'bg-blue-600 text-white';
                            btnColor = 'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-slate-800 dark:text-blue-400 dark:hover:bg-slate-700';
                        } else if (activeTab === 'materno') {
                            borderColor = 'border-pink-100 dark:border-pink-900/50 hover:border-pink-300 dark:hover:border-pink-700';
                            bgColor = 'bg-pink-50/50 dark:bg-pink-900/10 border-pink-50 dark:border-slate-800';
                            iconColor = 'bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400';
                            badgeBg = 'bg-pink-500 text-white';
                            btnColor = 'bg-pink-50 text-pink-700 hover:bg-pink-100 dark:bg-slate-800 dark:text-pink-400 dark:hover:bg-slate-700';
                        } else {
                            borderColor = 'border-teal-100 dark:border-teal-900/50 hover:border-teal-300 dark:hover:border-teal-700';
                            bgColor = 'bg-teal-50/50 dark:bg-teal-900/10 border-teal-50 dark:border-slate-800';
                            iconColor = 'bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400';
                            badgeBg = 'bg-teal-500 text-white';
                            btnColor = 'bg-teal-50 text-teal-700 hover:bg-teal-100 dark:bg-slate-800 dark:text-teal-400 dark:hover:bg-slate-700';
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
                                                SE {item.semana} - {item.anio}
                                            </h3>
                                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeBg}`}>
                                                SEMANAL
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
                                        Ver Documento
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
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No hay reportes semanales disponibles</h3>
                            <p className="text-slate-500 max-w-sm">No se han registrado reportes para esta categoría aún. Comienza subiendo el primer informe semanal.</p>
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>

            <SalaSituacionalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                activeTab={activeTab}
            />
        </div>
    );
}
