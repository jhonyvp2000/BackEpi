import { db } from './src/db/index';
import { systems, roles, permissions, rolePermissions } from './src/db/schema';

async function main() {
    console.log('Seeding BackEpi roles and systems...');

    try {
        // 1. Create or update 'backepi' system
        await db.insert(systems).values({
            id: 'backepi',
            name: 'BackEpi Epidemiología',
            description: 'Sistema de Epidemiología e Inteligencia Sanitaria',
            isActive: true
        }).onConflictDoUpdate({
            target: systems.id,
            set: { name: 'BackEpi Epidemiología' }
        });
        console.log('✅ System backepi registered.');

        // 2. Create BackEpi Admin Role
        const [adminRole] = await db.insert(roles).values({
            systemId: 'backepi',
            name: 'Supervisor Epidemiólogo',
            description: 'Administrador total del módulo BackEpi',
        }).returning();
        console.log('✅ Role created:', adminRole.name, adminRole.id);

        // 3. Create dummy permission (required for the UI navigation check if needed)
        const [fullAccess] = await db.insert(permissions).values({
            systemId: 'backepi',
            resource: 'all',
            action: 'manage',
            description: 'Acceso total a epidemiologia'
        }).returning();
        console.log('✅ Permission created:', fullAccess.action);

        // 4. Link role and permission
        await db.insert(rolePermissions).values({
            roleId: adminRole.id,
            permissionId: fullAccess.id,
        }).onConflictDoNothing();
        console.log('✅ Role and permissions linked.');

        // 5. Assign to Jhony Vela Paredes (DNI 09791569)
        const userId = '1e9c80c1-d02e-43e7-b667-9f1a8b711271'; // ID from checkUser.ts

        const { userSystemRoles } = await import('./src/db/schema');
        await db.insert(userSystemRoles).values({
            userId: userId,
            systemId: 'backepi',
            roleId: adminRole.id
        }).onConflictDoNothing();

        console.log('✅ BackEpi role assigned to user 09791569 successfully!');

    } catch (e) {
        console.error('❌ Error in seed:', e);
    }
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
