'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, BarChart3, FileText, Home, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Indicadores', href: '/indicadores', icon: Activity },
    { name: 'Sala Situacional', href: '/sala-situacional', icon: BarChart3 },
    { name: 'Boletines', href: '/boletines', icon: FileText },
];

export function Sidebar() {
    const pathname = usePathname();

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
        </div>
    );
}
