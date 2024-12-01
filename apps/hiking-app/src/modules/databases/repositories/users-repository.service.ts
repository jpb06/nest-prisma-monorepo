import { Injectable } from '@nestjs/common';
import { User } from '@prisma/db-users';
import { from, Observable } from 'rxjs';

import { UsersDatabaseService } from '@libs/databases';

@Injectable()
export class UsersRepositoryService extends UsersDatabaseService {
  getAll = (): Observable<User[]> => from(this.usersDB.user.findMany());
}
