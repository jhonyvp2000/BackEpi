'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, BarChart3, FileText, Home, ShieldAlert, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';

const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Indicadores', href: '/indicadores', icon: Activity },
    { name: 'Sala Situacional', href: '/sala-situacional', icon: BarChart3 },
    { name: 'Boletines', href: '/boletines', icon: FileText },
];

export function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <div className="flex h-full w-64 flex-col bg-white border-r border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <div className="flex h-16 shrink-0 items-center justify-center border-b border-slate-200 dark:border-slate-800 px-6">
                <div className="flex items-center gap-2 font-bold text-xl text-[var(--color-hospital-blue)] dark:text-[var(--color-hospital-light)]">
                    <ShieldAlert className="w-6 h-6" />
                    <span>BackEpi</span>
                </div>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto pt-6 px-4">
                <nav className="flex-1 space-y-2">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out relative',
                                    isActive
                                        ? 'text-white'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-white'
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute inset-0 rounded-lg bg-[var(--color-hospital-blue)]"
                                        initial={false}
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <item.icon
                                    className={cn(
                                        'mr-3 h-5 w-5 shrink-0 z-10',
                                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300'
                                    )}
                                    aria-hidden="true"
                                />
                                <span className="z-10">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* User Profile & Logout */}
            <div className="mt-auto border-t border-slate-200 dark:border-slate-800 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[var(--color-hospital-blue)] shrink-0">
                            <User className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col truncate">
                            <span className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                {session?.user?.name || 'Usuario'}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 capitalize truncate">
                                {(session?.user as any)?.lastname || 'Epidemiología'}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => signOut({ callbackUrl: '/login' })}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                        title="Cerrar sesión"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
