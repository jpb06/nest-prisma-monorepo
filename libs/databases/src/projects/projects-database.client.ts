/* eslint-disable brace-style */
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/db-projects';

@Injectable()
export class ProjectsDatabaseClient
  extends PrismaClient
  implements OnModuleInit
{
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  enableShutdownHooks(app: INestApplication): void {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
