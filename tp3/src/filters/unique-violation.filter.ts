import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

enum PostgresErrorsEnums {
  UniqueViolation = '23505',
  CheckViolation = '23514',
  NotNullViolation = '23502',
  ForeignKeyViolation = '23503'
}

@Catch(QueryFailedError)
export class UniqueViolationFilter implements ExceptionFilter {
  constructor(readonly entity: string) {
    
  }

  catch(exception , host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    console.log(exception)

    if (exception.code === PostgresErrorsEnums.UniqueViolation) {
      response
        .status(HttpStatus.CONFLICT)
        .json({
          statusCode: HttpStatus.CONFLICT,
          message:[ this.entity+' is not unique'],
          error:"Conflict"
        });

    }

  }
}
