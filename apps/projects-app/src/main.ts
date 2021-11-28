import * as dotEnv from 'dotenv-flow';

import { bootstrap } from '@libs/boostraper';

import { externalDatabasesClients } from './modules/databases/external-databases-clients';

dotEnv.config({
  silent: true,
});

// We need to load .env vars before loading the appModule
const AppModule = require('./modules/app.module').AppModule;

void (async (): Promise<void> => {
  const app = await bootstrap(
    AppModule,
    process.env.PROJECTS_APP_PORT || process.env.PORT || 5002,
    'Projects service',
    'Everything related with projects',
  );

  externalDatabasesClients.forEach(async (el) => {
    const service = app.get(el as never);
    await service.enableShutdownHooks(app);
  });
})();
