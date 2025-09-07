import type { PrismaConfig } from 'prisma';

import 'dotenv/config';

// biome-ignore lint/style/noDefaultExport: prisma
export default {
  schema: 'projects-schema.prisma',
  migrations: {
    path: 'migrations',
    seed: 'bun ./prisma/projects/seed.ts',
  },
} satisfies PrismaConfig;
