import { PrismaClient as HikingDb } from '@prisma/db-hiking';

const seedHikingDb = async () => {
  const hikingDb = new HikingDb();

  await hikingDb.trail.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Grand mounier',
    },
  });
  await hikingDb.trail.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Vallée des merveilles',
    },
  });
  await hikingDb.trail.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Marguareis',
    },
  });

  await hikingDb.session.upsert({
    where: { id: 1 },
    update: {},
    create: {
      idTrail: 1,
      date: new Date(),
    },
  });
  await hikingDb.session.upsert({
    where: { id: 2 },
    update: {},
    create: {
      idTrail: 1,
      date: new Date(),
    },
  });
  await hikingDb.session.upsert({
    where: { id: 3 },
    update: {},
    create: {
      idTrail: 2,
      date: new Date(),
    },
  });
  await hikingDb.session.upsert({
    where: { id: 4 },
    update: {},
    create: {
      idTrail: 3,
      date: new Date(),
    },
  });

  await hikingDb.sessionParticipant.upsert({
    where: { id: 1 },
    update: {},
    create: {
      idDev: 1,
      idSession: 1,
    },
  });
  await hikingDb.sessionParticipant.upsert({
    where: { id: 2 },
    update: {},
    create: {
      idDev: 2,
      idSession: 1,
    },
  });
  await hikingDb.sessionParticipant.upsert({
    where: { id: 3 },
    update: {},
    create: {
      idDev: 3,
      idSession: 1,
    },
  });
  await hikingDb.sessionParticipant.upsert({
    where: { id: 4 },
    update: {},
    create: {
      idDev: 3,
      idSession: 4,
    },
  });
  await hikingDb.sessionParticipant.upsert({
    where: { id: 5 },
    update: {},
    create: {
      idDev: 2,
      idSession: 3,
    },
  });
  await hikingDb.sessionParticipant.upsert({
    where: { id: 6 },
    update: {},
    create: {
      idDev: 3,
      idSession: 3,
    },
  });
  await hikingDb.sessionParticipant.upsert({
    where: { id: 6 },
    update: {},
    create: {
      idDev: 1,
      idSession: 2,
    },
  });

  console.info('Hiking database seeded');
};

seedHikingDb();
