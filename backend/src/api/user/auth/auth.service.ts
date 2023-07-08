import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/api/user/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { AuthHelper } from './helper/auth.helper';
import { ExceptionService } from '@/shared/services/exception.service';
import { ResponseService } from '@/shared/services/response.service';
import { RESPONSE_MESSAGES } from '@/utils/enums/response.messages.enum';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private readonly exceptionService: ExceptionService,
    private readonly responseService: ResponseService,
    @Inject(AuthHelper) private readonly helper: AuthHelper
  ) { }

  public async register(body: RegisterDto) {
    const { name, email, password }: RegisterDto = body;
    let user: User = await this.repository.findOne({ where: { email } });
    if (user) {
      return this.exceptionService.sendBadRequestException(RESPONSE_MESSAGES.USER_ALREADY_EXIST);
    }
    user = new User();
    user.name = name;
    user.email = email;
    user.password = this.helper.encodePassword(password);
    const newUser = this.repository.save(user);
    return this.responseService.sendSuccessResponse(RESPONSE_MESSAGES.SUCCESS, newUser);
  }

  public async login(body: LoginDto) {
    const { email, password }: LoginDto = body;
    const user: User = await this.repository.findOne({ where: { email } });
    if (!user) {
      return this.exceptionService.sendBadRequestException(RESPONSE_MESSAGES.USER_NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      return this.exceptionService.sendBadRequestException(RESPONSE_MESSAGES.USER_NOT_FOUND); // send proper error message
    }

    this.repository.update(user.id, { lastLoginAt: new Date() });
    const token = this.helper.generateToken(user);

    return this.responseService.sendSuccessResponse(RESPONSE_MESSAGES.SUCCESS, token);
  }

  public async refresh(user: User): Promise<string> {
    this.repository.update(user.id, { lastLoginAt: new Date() });
    return this.helper.generateToken(user);
  }
}
