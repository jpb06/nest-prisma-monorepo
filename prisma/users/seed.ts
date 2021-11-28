import { PrismaClient as UsersDb } from '@prisma/db-users';

export const seedUsersDb = async () => {
  const usersDb = new UsersDb();

  await usersDb.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Alice',
      position: 'Squad owner',
    },
  });
  await usersDb.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Jon',
      position: 'VP of Engineering',
    },
  });
  await usersDb.user.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Adrien',
      position: 'Devops',
    },
  });
  await usersDb.user.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: 'Sarah',
      position: 'Dev',
    },
  });
  await usersDb.user.upsert({
    where: { id: 1000 },
    update: {},
    create: {
      name: 'Yolo',
      position: 'Bro',
    },
  });

  console.info('Users database seeded');
};
