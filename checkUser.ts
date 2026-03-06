import { db } from './src/db/index';
import { users, userSystemRoles } from './src/db/schema';
import { eq } from 'drizzle-orm';

async function main() {
    const result = await db.select().from(users).where(eq(users.dni, '09791569'));
    console.log('User Result:', result);
    if (result.length > 0) {
        const roles = await db.select().from(userSystemRoles).where(eq(userSystemRoles.userId, result[0].id));
        console.log('Roles Result:', roles);
    } else {
        console.log('User not found.');
    }
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
