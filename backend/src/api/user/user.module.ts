import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { AuthModule } from './auth/auth.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, PersonModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
