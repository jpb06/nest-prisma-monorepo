import { Prisma } from '@prisma/db-projects';

export const selectContribution = <T extends Prisma.ContributionSelect>(
  select: Prisma.Subset<T, Prisma.ContributionSelect>,
): T => {
  return select;
};
