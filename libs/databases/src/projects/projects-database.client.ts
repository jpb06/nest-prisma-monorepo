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

  async enableShutdownHooks(app: INestApplication): Promise<void> {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
