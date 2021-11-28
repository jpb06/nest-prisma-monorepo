import { PrismaClient as ProjectsDb } from '@prisma/db-projects';

export const seedProjectsDb = async () => {
  const projectsDb = new ProjectsDb();

  await projectsDb.project.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'jest badges',
    },
  });
  await projectsDb.repo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      idProject: 1,
      name: 'jest-badges-action',
      repoUrl: 'https://github.com/jpb06/jest-badges-action',
    },
  });
  await projectsDb.repo.upsert({
    where: { id: 2 },
    update: {},
    create: {
      idProject: 1,
      name: 'node-jest-badges',
      repoUrl: 'https://github.com/jpb06/node-jest-badges',
    },
  });

  await projectsDb.project.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'gapi',
    },
  });
  await projectsDb.repo.upsert({
    where: { id: 3 },
    update: {},
    create: {
      idProject: 2,
      name: 'gapi-oauth-react-hooks',
      repoUrl: 'https://github.com/jpb06/gapi-oauth-react-hooks',
    },
  });

  await projectsDb.contribution.upsert({
    where: { id: 1 },
    update: {},
    create: {
      idDev: 1,
      idRepo: 1,
      date: new Date(),
    },
  });
  await projectsDb.contribution.upsert({
    where: { id: 2 },
    update: {},
    create: {
      idDev: 1,
      idRepo: 2,
      date: new Date(),
    },
  });
  await projectsDb.contribution.upsert({
    where: { id: 3 },
    update: {},
    create: {
      idDev: 2,
      idRepo: 2,
      date: new Date(),
    },
  });
  await projectsDb.contribution.upsert({
    where: { id: 4 },
    update: {},
    create: {
      idDev: 3,
      idRepo: 3,
      date: new Date(),
    },
  });

  console.info('Projects database seeded');
};
