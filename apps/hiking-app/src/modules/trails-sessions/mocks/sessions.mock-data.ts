import { SessionSelectType } from '../../databases/selects/sessions.select';

export const mockedsessions: Array<SessionSelectType> = [
  {
    id: 1,
    date: new Date(2022, 2, 20),
    Trail: {
      id: 1,
      name: 'Grand mounier',
    },
    Participants: [
      {
        idDev: 1,
      },
      {
        idDev: 2,
      },
    ],
  },
  {
    id: 2,
    date: new Date(2036, 11, 1),
    Trail: {
      id: 2,
      name: 'Vallée des merveilles',
    },
    Participants: [
      {
        idDev: 2,
      },
      { idDev: 3 },
    ],
  },
];
