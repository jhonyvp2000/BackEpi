import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupBucket() {
    const bucketName = 'indicadoresboletinesepidemiologicos';

    console.log(`Verificando bucket '${bucketName}'...`);

    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    if (listError) {
        console.error("Error listando buckets:", listError);
        return;
    }

    const exists = buckets.find(b => b.name === bucketName);

    if (!exists) {
        console.log(`Creando bucket '${bucketName}'...`);
        const { error: createError } = await supabase.storage.createBucket(bucketName, {
            public: true,
            fileSizeLimit: 10485760, // 10MB
        });

        if (createError) {
            console.error("Error creando bucket:", createError);
        } else {
            console.log(`✅ Bucket '${bucketName}' creado correctamente y es público.`);
        }
    } else {
        console.log(`✅ Bucket '${bucketName}' ya existe.`);
        // Asegurarnos que es público
        await supabase.storage.updateBucket(bucketName, {
            public: true,
        });
        console.log(`✅ Bucket mapeado a público por seguridad.`);
    }

    process.exit(0);
}

setupBucket();
