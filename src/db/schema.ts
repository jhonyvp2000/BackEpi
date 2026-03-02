import { pgTable, serial, integer, numeric, text, timestamp, boolean, date, varchar, uuid, primaryKey } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// --- RBAC CORE SCHEMAS ---------------------------------------------------- //

// 1. Users Table
export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    dni: varchar("dni", { length: 8 }).unique().notNull(),
    passwordHash: varchar("password_hash").notNull(),
    name: varchar("name").notNull(),
    lastname: varchar("lastname").notNull(),
    email: varchar("email").unique().notNull(),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 2. Systems Table (e.g. BackRRHH, Hospital Portal, BackEpi)
export const systems = pgTable("systems", {
    id: varchar("id", { length: 50 }).primaryKey(), // 'backrrhh', 'hospital', 'fevrex', 'backepi'
    name: varchar("name").notNull(),
    description: text("description"),
    isActive: boolean("is_active").default(true),
});

// 3. Permissions Table (Universal Catalog of actions)
export const permissions = pgTable("permissions", {
    id: uuid("id").defaultRandom().primaryKey(),
    systemId: varchar("system_id", { length: 50 }).references(() => systems.id, { onDelete: 'cascade' }).notNull(),
    resource: varchar("resource").notNull(),
    action: varchar("action").notNull(),     // 'create', 'read', 'update', 'delete'
    description: text("description"),
});

// 4. Roles Table (Logical Groupers of Permissions)
export const roles = pgTable("roles", {
    id: uuid("id").defaultRandom().primaryKey(),
    systemId: varchar("system_id", { length: 50 }).references(() => systems.id, { onDelete: 'cascade' }).notNull(),
    name: varchar("name").notNull(),
    description: text("description"),
});

// 5. Role Permissions (Matrix mapping Roles <-> Permissions)
export const rolePermissions = pgTable("role_permissions", {
    roleId: uuid("role_id").references(() => roles.id, { onDelete: 'cascade' }).notNull(),
    permissionId: uuid("permission_id").references(() => permissions.id, { onDelete: 'cascade' }).notNull(),
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.roleId, table.permissionId] }),
    };
});

// 6. User System Roles (Final Assignment to Users)
export const userSystemRoles = pgTable("user_system_roles", {
    userId: uuid("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
    systemId: varchar("system_id", { length: 50 }).references(() => systems.id, { onDelete: 'cascade' }).notNull(),
    roleId: uuid("role_id").references(() => roles.id, { onDelete: 'cascade' }).notNull(),
    assignedAt: timestamp("assigned_at").defaultNow().notNull(),
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.userId, table.systemId, table.roleId] }),
    };
});


// ==========================================
// Módulo 1: Indicadores Hospitalarios Diarios
// ==========================================
export const dailyIndicators = pgTable("epi_daily_indicators", {
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
export const epidemiologicalWeeks = pgTable("epi_weeks", {
    id: serial("id").primaryKey(),
    weekNumber: integer("week_number").notNull(), // Ej. 45
    year: integer("year").notNull(), // Ej. 2026
    startDate: date("start_date").notNull(),
    endDate: date("end_date").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const dengueRecords = pgTable("epi_dengue_records", {
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
export const epidemiologicalBulletins = pgTable("epi_bulletins", {
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
