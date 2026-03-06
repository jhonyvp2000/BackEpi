import { db } from './src/db/index';
import { sql } from 'drizzle-orm';

async function run() {
    try {
        await db.execute(sql`DROP TABLE IF EXISTS epi_respiratory_records`);
        await db.execute(sql`DROP TABLE IF EXISTS epi_maternal_records`);
        await db.execute(sql`DROP TABLE IF EXISTS epi_dengue_records`);
        await db.execute(sql`DROP TABLE IF EXISTS epi_weeks`);
        console.log('✅ Dropped old sala situacional tables');
    } catch (e) {
        console.error('Error dropping old tables:', e);
    }

    try {
        await db.execute(sql`CREATE TABLE IF NOT EXISTS epi_weekly_situational (
            id serial PRIMARY KEY,
            tab varchar(50) NOT NULL,
            week_number integer NOT NULL,
            year integer NOT NULL,
            document_url text NOT NULL,
            created_by text,
            created_at timestamp DEFAULT now() NOT NULL
        )`);
        console.log('✅ Added epi_weekly_situational table');
    } catch (e) {
        console.error('Error creating weekly_situational table:', e);
    }

    process.exit(0);
}

run().catch(console.error);
