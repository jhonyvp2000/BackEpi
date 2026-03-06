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
// Módulo 1: Indicadores Hospitalarios Mensuales (PDFs)
// ==========================================
export const monthlyIndicators = pgTable("epi_monthly_indicators", {
    id: serial("id").primaryKey(),
    tab: varchar("tab", { length: 50 }).notNull(), // 'rendimiento' | 'analisis'
    month: varchar("month", { length: 20 }).notNull(), // Ej. 'Enero'
    year: integer("year").notNull(), // Ej. 2026
    documentUrl: text("document_url").notNull(), // URL del archivo PDF en Supabase
    createdBy: text("created_by"), // DNI o ID del usuario que subió el reporte
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ==========================================
// Módulo 2: Sala Situacional Semanal (PDFs por categoría)
// ==========================================
export const weeklySituational = pgTable("epi_weekly_situational", {
    id: serial("id").primaryKey(),
    tab: varchar("tab", { length: 50 }).notNull(), // 'metaxenicas' | 'materno' | 'respiratorio'
    weekNumber: integer("week_number").notNull(), // Ej. 45
    year: integer("year").notNull(), // Ej. 2026
    documentUrl: text("document_url").notNull(), // URL del archivo PDF en Supabase
    createdBy: text("created_by"), // Usuario que subió el reporte
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ==========================================
// Módulo 3: Boletines Mensuales (PDFs por categoría)
// ==========================================
export const monthlyBulletins = pgTable("epi_monthly_bulletins", {
    id: serial("id").primaryKey(),
    tab: varchar("tab", { length: 50 }).notNull(), // 'epidemiologico' | 'infecciones' | 'estadistico'
    month: varchar("month", { length: 20 }).notNull(), // Ej. 'Enero'
    year: integer("year").notNull(), // Ej. 2026
    documentUrl: text("document_url").notNull(), // URL del archivo PDF en Supabase
    createdBy: text("created_by"), // Usuario que subió el reporte
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
