import { HttpException, HttpStatus } from "@nestjs/common";

export class ServiceException extends HttpException {
  constructor(name: string | object, status: HttpStatus) {
    super(name, status);
  }
}
