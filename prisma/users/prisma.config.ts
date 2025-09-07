import type { PrismaConfig } from 'prisma';

import 'dotenv/config';

// biome-ignore lint/style/noDefaultExport: prisma
export default {
  schema: 'users-schema.prisma',
  migrations: {
    path: 'migrations',
    seed: 'bun ./prisma/users/seed.ts',
  },
} satisfies PrismaConfig;
