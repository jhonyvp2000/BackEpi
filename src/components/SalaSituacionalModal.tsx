'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileText } from 'lucide-react';
import { saveWeeklySituational } from '@/app/actions/salaSituacional';

interface SalaSituacionalModalProps {
    isOpen: boolean;
    onClose: () => void;
    activeTab: string; // 'metaxenicas' | 'materno' | 'respiratorio'
}

export function SalaSituacionalModal({ isOpen, onClose, activeTab }: SalaSituacionalModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formElement = e.target as HTMLFormElement;
            const formData = new FormData(formElement);
            formData.append('tab', activeTab);

            const result = await saveWeeklySituational(formData);

            if (result.success) {
                alert('Boletín Sala Situacional guardado exitosamente.');
                setFileName(null);
                formElement.reset();
                onClose();
            } else {
                alert(result.error || 'Ocurrió un error al guardar el registro.');
            }
        } catch (error) {
            console.error(error);
            alert('Error al guardar el registro.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName(null);
        }
    };

    let title = "";
    let buttonColor = "";

    switch (activeTab) {
        case 'metaxenicas':
            title = "Subir Reporte de Metaxénicas";
            buttonColor = "bg-[var(--color-hospital-blue)] hover:bg-blue-700";
            break;
        case 'materno':
            title = "Subir Reporte Materno Neonatal";
            buttonColor = "bg-pink-600 hover:bg-pink-700";
            break;
        case 'respiratorio':
            title = "Subir Reporte de V. Respiratoria";
            buttonColor = "bg-teal-600 hover:bg-teal-700";
            break;
    }

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-slate-900/50 backdrop-blur-sm p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 shadow-xl"
                >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 p-6">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            {title}
                        </h3>
                        <button
                            onClick={onClose}
                            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 dark:hover:bg-slate-800 transition"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Semana Epidemiológica (SE)</label>
                                <input name="weekNumber" required type="number" min="1" max="53" placeholder="Ej. 45" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 dark:text-white dark:bg-slate-800 dark:border-slate-700 focus:border-[var(--color-hospital-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--color-hospital-blue)]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Año</label>
                                <input name="year" required type="number" defaultValue={new Date().getFullYear()} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 dark:text-white dark:bg-slate-800 dark:border-slate-700 focus:border-[var(--color-hospital-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--color-hospital-blue)]" />
                            </div>
                        </div>

                        {/* Subir PDF */}
                        <div className="mb-6">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Archivo de la Sala Semanal (PDF/PPT)</label>
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 dark:hover:bg-bray-800 dark:bg-slate-800 hover:bg-slate-100 dark:border-slate-600 dark:hover:border-slate-500 dark:hover:bg-slate-700 transition">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <FileText className="w-8 h-8 mb-3 text-slate-400" />
                                    {fileName ? (
                                        <p className="mb-2 text-sm text-[var(--color-hospital-blue)] font-semibold">{fileName}</p>
                                    ) : (
                                        <>
                                            <p className="mb-2 text-sm text-slate-500 dark:text-slate-400"><span className="font-semibold cursor-pointer text-blue-600">Haz clic para subir archivo</span> o arrástralo</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Archivos PDF, PPT o PPTX (Max 15MB)</p>
                                        </>
                                    )}
                                </div>
                                <input name="documentFile" id="dropzone-file-sala" type="file" className="hidden" accept=".pdf,.ppt,.pptx" onChange={handleFileChange} required />
                            </label>
                        </div>

                        {/* Botones */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700 dark:hover:border-slate-600 dark:focus:ring-slate-700 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-5 py-2.5 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition flex items-center gap-2 ${buttonColor} ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        Subiendo...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-4 h-4" />
                                        Subir Archivo
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
