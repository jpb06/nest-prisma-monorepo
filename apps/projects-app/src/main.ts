require('dotenv-flow').config({ silent: true });

import { bootstrap } from '@libs/boostraper';

import { AppModule } from './modules/app.module';
import { externalDatabasesClients } from './modules/databases/external-databases-clients';

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
