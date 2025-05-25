require('dotenv-flow').config({ silent: true });

import { bootstrap } from '@libs/boostraper';
import { AppModule } from './modules/app.module';
import { externalDatabasesClients } from './modules/databases/external-databases-clients';

(async (): Promise<void> => {
  const app = await bootstrap(
    AppModule,
    process.env.HIKING_APP_PORT || process.env.PORT || 5001,
    'Hiking service',
    'Everything related with hiking',
  );

  for (const clients of externalDatabasesClients) {
    const service = app.get(clients as never);
    await service.enableShutdownHooks(app);
  }
})();
