import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("❌ DATABASE_URL no está definido en las variables de entorno");
}

// Desactivar prefetch como lo requiere Supabase / pooling normal de Postgres en Vercel/Producción
const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
