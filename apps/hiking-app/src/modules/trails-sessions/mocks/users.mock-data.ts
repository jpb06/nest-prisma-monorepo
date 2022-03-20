import { User } from '@prisma/db-users';

export const mockedUsers: Array<User> = [
  {
    id: 1,
    name: 'Yolo Bro',
    position: 'Dev',
  },
  {
    id: 2,
    name: 'Marie Cool',
    position: 'Devops',
  },
  {
    id: 3,
    name: 'Cool Kid',
    position: 'Dev',
  },
];
