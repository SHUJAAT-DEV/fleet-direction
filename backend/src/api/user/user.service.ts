import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { UpdateNameDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth/auth.service';
import { PersonService } from './person/person.service';
import { CreatePersonDto } from './person/dto/create-person.dto';

//  Thinking this ways ....
@Injectable()
export class UserService {
  constructor
    (
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
      private readonly personService: PersonService,
      private readonly authService: AuthService
    ) { }

  public async updateName(body: UpdateNameDto, req: Request): Promise<User> {
    const user: User = <User>req.user;
    user.name = body.name;
    return this.userRepository.save(user);
  }


  public async createPerson(createUserDto: CreateUserDto): Promise<string> {
    const person = new CreatePersonDto();
    person.name = createUserDto.name;
    person.phoneNumber = createUserDto.phoneNumber
    const newPerson = await this.personService.create(person);
    return newPerson.id;
  }

  public findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email: email
      }
    });
  }

  public findById(id: string) {
    return this.userRepository.findOne({
      where: {
        id: id
      }
    });
  }

  public getAll() {
    return this.userRepository.find();

  }
}
