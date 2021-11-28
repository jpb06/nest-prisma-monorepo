import { Contribution, Repo } from '@prisma/db-projects';

import { selectContribution } from '@libs/databases';

export type ContributionSelectType = Partial<Contribution> & {
  id: number;
  date: Date;
  idDev: number;
  Repo: Repo | null;
};

export const contributionsSelect = selectContribution({
  id: true,
  date: true,
  idDev: true,
  Repo: true,
});
