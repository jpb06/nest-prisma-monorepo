import { seedUsersDb } from './users/seed';
import { seedProjectsDb } from './projects/seed';
import { seedHikingDb } from './hiking/seed';

export const seed = async () => {
  await Promise.all([seedUsersDb(), seedProjectsDb(), seedHikingDb()]);
};
seed();
