import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';
import { CreateErrorResponseDto } from '../dtos/create-error-response.dto';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: Error, host: ArgumentsHost) {
    if (exception instanceof MongoError) {
      return this.mongoException(exception, host);
    } else {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const output: any = {
        success: false,
        error: exception.message,
      } as CreateErrorResponseDto;
      if (exception instanceof HttpException) {
        response.status(exception.getStatus()).json(output);
      } else {
        response.status(500).json(output);
      }
    }
  }

  mongoException(e: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = 500;
    const output = {
      success: false,
      error: e.errmsg,
    } as CreateErrorResponseDto;
    switch (e.code) {
      case 11000:
        status = 422;
        break;
    }
    response.status(status).json(output);
  }
}
