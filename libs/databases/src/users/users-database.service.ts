import { Injectable } from '@nestjs/common';
import { User } from '@prisma/db-users';
import { from, Observable } from 'rxjs';

import { UsersDatabaseClient } from './users-database.client';

@Injectable()
export class UsersDatabaseService {
  constructor(protected readonly usersDB: UsersDatabaseClient) {}

  getBy = (ids: Array<number>): Observable<User[]> =>
    from(
      this.usersDB.user.findMany({
        where: {
          id: {
            in: ids,
          },
        },
      }),
    );
}
