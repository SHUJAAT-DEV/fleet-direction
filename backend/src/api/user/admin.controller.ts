import { Controller, Inject } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('admin')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

}
