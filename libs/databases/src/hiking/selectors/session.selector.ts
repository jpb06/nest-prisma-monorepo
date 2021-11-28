import { Prisma } from '@prisma/db-hiking';

export const selectSession = <T extends Prisma.SessionSelect>(
  select: Prisma.Subset<T, Prisma.SessionSelect>,
): T => {
  return select;
};
