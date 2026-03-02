import { pgTable, serial, integer, numeric, text, timestamp, boolean, date } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// ==========================================
// Módulo 1: Indicadores Hospitalarios Diarios
// ==========================================
export const dailyIndicators = pgTable("daily_indicators", {
    id: serial("id").primaryKey(),
    date: date("date").notNull().unique(), // Sólo un registro por día
    outpatientConsultations: integer("outpatient_consultations").default(0), // Consultas Externas
    emergencyAttendances: integer("emergency_attendances").default(0), // Atenciones en Emergencia
    surgeries: integer("surgeries").default(0), // Intervenciones Quirúrgicas
    occupancyRate: numeric("occupancy_rate", { precision: 5, scale: 2 }).default('0'), // % Ocupación
    notes: text("notes"), // Observaciones del día
    createdBy: text("created_by"), // Usuario que registró
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


// ==========================================
// Módulo 2: Sala Situacional Virtual (Ej. Dengue)
// ==========================================
export const epidemiologicalWeeks = pgTable("epidemiological_weeks", {
    id: serial("id").primaryKey(),
    weekNumber: integer("week_number").notNull(), // Ej. 45
    year: integer("year").notNull(), // Ej. 2026
    startDate: date("start_date").notNull(),
    endDate: date("end_date").notNull(),
    // Índice para evitar semanas duplicadas por año (lógica a manejar en ORM)
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const dengueRecords = pgTable("dengue_records", {
    id: serial("id").primaryKey(),
    weekId: integer("week_id").references(() => epidemiologicalWeeks.id).notNull(),
    confirmedCases: integer("confirmed_cases").default(0).notNull(),
    alarmSignsCases: integer("alarm_signs_cases").default(0).notNull(),
    hospitalizedCases: integer("hospitalized_cases").default(0).notNull(),
    deaths: integer("deaths").default(0).notNull(),
    notes: text("notes"),
    createdBy: text("created_by"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


// ==========================================
// Módulo 3: Boletines Epidemiológicos
// ==========================================
export const epidemiologicalBulletins = pgTable("epidemiological_bulletins", {
    id: serial("id").primaryKey(),
    weekId: integer("week_id").references(() => epidemiologicalWeeks.id).notNull(),
    volume: text("volume").notNull(), // Ej. "Vol. 45"
    title: text("title").notNull(), // Título descriptivo
    fileUrl: text("file_url").notNull(), // URL de descarga (Supabase Storage u otro)
    downloads: integer("downloads").default(0).notNull(), // Contador de descargas
    isPublished: boolean("is_published").default(true).notNull(),
    publishedAt: timestamp("published_at"),
    createdBy: text("created_by"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
