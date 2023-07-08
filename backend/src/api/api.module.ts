import { Module } from '@nestjs/common';
import { AuthModule } from './user/auth/auth.module';
import { PersonModule } from './user/person/person.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [UserModule, AuthModule, PersonModule],
})
export class ApiModule { }
