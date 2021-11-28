import { Injectable } from '@nestjs/common';

import { UsersDatabaseService } from '@libs/databases';

@Injectable()
export class UsersRepositoryService extends UsersDatabaseService {}
