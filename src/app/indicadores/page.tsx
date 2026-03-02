'use client';

import { useState } from 'react';
import { Activity, Plus, Save, ActivitySquare, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IndicadoresPage() {
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        // Simular guardado
        setTimeout(() => {
            setIsSaving(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1500);
    };

    return (
        <div className="flex-1 space-y-8 p-8 pt-6 max-w-5xl mx-auto w-full">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                    <ActivitySquare className="w-8 h-8 text-[var(--color-hospital-blue)]" />
                    Registro Diario de Indicadores
                </h2>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="rounded-xl border border-slate-200 bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
            >
                <div className="flex flex-col space-y-1.5 p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                    <h3 className="font-semibold leading-none flex items-center gap-2">
                        Formulario de Carga
                    </h3>
                    <p className="text-sm text-slate-500">Ingrese los datos correspondientes al día actual de producción hospitalaria.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="fecha" className="text-sm font-medium leading-none text-slate-700 dark:text-slate-300">
                                Fecha del Registro
                            </label>
                            <input
                                type="date"
                                id="fecha"
                                defaultValue={new Date().toISOString().split('T')[0]}
                                className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-hospital-blue)] focus:border-transparent dark:border-slate-700 transition"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="consultas" className="text-sm font-medium leading-none text-slate-700 dark:text-slate-300">
                                Consultas Externas
                            </label>
                            <input
                                type="number"
                                id="consultas"
                                placeholder="Ej. 1450"
                                min="0"
                                className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-hospital-blue)] focus:border-transparent dark:border-slate-700 transition"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="emergencias" className="text-sm font-medium leading-none text-slate-700 dark:text-slate-300">
                                Atenciones de Emergencia
                            </label>
                            <input
                                type="number"
                                id="emergencias"
                                placeholder="Ej. 380"
                                min="0"
                                className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-hospital-blue)] focus:border-transparent dark:border-slate-700 transition"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="ocupacion" className="text-sm font-medium leading-none text-slate-700 dark:text-slate-300">
                                Porcentaje de Ocupación Hospitalaria (%)
                            </label>
                            <input
                                type="number"
                                id="ocupacion"
                                placeholder="Ej. 85"
                                min="0"
                                max="100"
                                className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-hospital-blue)] focus:border-transparent dark:border-slate-700 transition"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <AnimatePresence>
                            {showSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium"
                                >
                                    <CheckCircle2 className="w-5 h-5 mr-2" />
                                    Datos guardados exitosamente
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSaving}
                            type="submit"
                            className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-6 py-2 bg-[var(--color-hospital-blue)] text-white hover:bg-[var(--color-hospital-blue)]/90 shadow-sm relative overflow-hidden`}
                        >
                            {isSaving ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" /> Guardar Registro
                                </>
                            )}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
