"use client";

import React, { useState } from 'react';
import { User, Lock, ArrowRight, Activity, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function EpidemiologyLoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await signIn('credentials', {
                dni,
                password,
                redirect: false, // Prevent NextAuth default redirect
            });

            if (res?.error) {
                setError('Credenciales incorrectas o usuario no autorizado para BackEpi.');
                setLoading(false);
            } else {
                // Success
                router.push('/');
            }
        } catch (error) {
            setError('Ocurrió un error inesperado al conectar.');
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[var(--color-hospital-bg)] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">

                {/* Left Side - Image/Brand */}
                <div className="w-full md:w-1/2 bg-[var(--color-hospital-blue)] text-white p-12 flex flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-6">
                            <Activity className="w-8 h-8" />
                            <span className="font-bold text-xl tracking-wider">EPIDEMIOLOGÍA</span>
                        </div>
                        <h1 className="text-4xl font-bold mb-4">Portal BackEpi</h1>
                        <p className="opacity-80">
                            Plataforma centralizada para la gestión de indicadores hospitalarios, sala situacional y boletines epidemiológicos.
                        </p>
                    </div>

                    <div className="relative z-10 mt-8">
                        <p className="text-sm font-medium mb-1">
                            Unidad de Inteligencia Sanitaria
                        </p>
                        <p className="text-xs opacity-60">
                            Hospital Referencial San Martín
                        </p>
                    </div>

                    {/* Decorative Circles */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full -ml-10 -mb-10"></div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full md:w-1/2 p-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Iniciar Sesión</h2>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Usuario / DNI</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <User className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    value={dni}
                                    onChange={(e) => setDni(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-hospital-light)] focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-800"
                                    placeholder="Ingrese su usuario o DNI"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Contraseña</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-hospital-light)] focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-800"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-[var(--color-hospital-blue)] text-white py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <span>Verificando Credenciales...</span>
                            ) : (
                                <>
                                    Ingresar a BackEpi <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                            <ShieldCheck className="w-4 h-4" />
                            Acceso restringido para personal autorizado
                        </p>
                    </div>
                </div>

            </div>
        </main>
    );
}
