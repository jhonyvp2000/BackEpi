import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local", override: true });

if (!process.env.DATABASE_URL) {
    console.log("No database url provided for edge cases testing/building");
}

export default {
    dialect: "postgresql",
    schema: "./src/db/schema.ts",
    out: "./src/db/migrations",
    tablesFilter: ["epi_*"], // IMPORTANT: Only manage tables that start with epi_ (ignores BackRRHH tables)
    dbCredentials: {
        url: process.env.DATABASE_URL || "",
    },
} satisfies Config;
