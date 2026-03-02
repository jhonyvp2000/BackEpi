import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "BackEpi - Sistema de Epidemiología",
  description: "Unidad de Epidemiología y Estadística del Hospital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} font-sans antialiased bg-[var(--color-hospital-bg)] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex h-screen overflow-hidden`}
      >
        <Sidebar />
        <main className="flex-1 flex flex-col h-full overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
