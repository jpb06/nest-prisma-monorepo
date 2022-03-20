import { Session, Trail } from '@prisma/db-hiking';

import { selectSession } from '@libs/databases';

export type SessionSelectType = Omit<Session, 'idTrail'> & {
  Trail: Trail | null;
  Participants: Array<{
    idDev: number;
  }>;
};

export const sessionsSelect = selectSession({
  id: true,
  date: true,
  Trail: {
    select: {
      id: true,
      name: true,
    },
  },
  Participants: {
    select: {
      idDev: true,
    },
  },
});
