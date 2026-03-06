import { db } from './src/db';
import { epidemiologicalWeeks, dengueRecords } from './src/db/schema';
import { eq } from 'drizzle-orm';

async function verifyInsertion() {
    const weeks = await db.select().from(epidemiologicalWeeks);
    console.log("Semanas:", weeks);

    const dengue = await db.select().from(dengueRecords);
    console.log("Registros de Dengue:", dengue);

    process.exit(0);
}

verifyInsertion();
