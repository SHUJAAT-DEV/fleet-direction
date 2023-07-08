import { Injectable, Logger } from '@nestjs/common'
import { RESPONSE_MESSAGES } from '../../utils/enums/response.messages.enum'
import { ExceptionService } from './exception.service'

@Injectable()
export class SharedService {
  private readonly logger = new Logger(SharedService.name)
  constructor(private readonly exceptionService: ExceptionService) { }

  sendError(error: any, funName: string) {
    console.log(`error in ${funName}: `, error)
    this.logger.error(`error in ${funName}: `, error, funName)
    if (!error.response) {
      this.exceptionService.sendInternalServerErrorException(error.message ?? RESPONSE_MESSAGES.SERVER_TEMPORY_DOWN)
    }
    throw error
  }

  sendResponse(message: string, data: any = {}) {
    return { message, data, status: 200 }
  }
}
