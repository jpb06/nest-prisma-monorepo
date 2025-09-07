import type { PrismaConfig } from 'prisma';

import 'dotenv/config';

// biome-ignore lint/style/noDefaultExport: prisma
export default {
  schema: 'hiking-schema.prisma',
  migrations: {
    path: 'migrations',
    seed: 'bun ./prisma/hiking/seed.ts',
  },
} satisfies PrismaConfig;
