import { PrismaPg } from "@prisma/adapter-pg";
import { defineConfig } from "prisma/config";

process.loadEnvFile();

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: { url: process.env.DATABASE_URL },
  migrations: { path: "prisma/migrations" },
  adapter: () => new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});
