import HTTPResponse from "../../../../interfaces/HTTPResponse";

export default class ResponseObject implements HTTPResponse {
  constructor(
    readonly statusCode: number,
    readonly body?: unknown,
    readonly isTokenGenRequired?: boolean,
  ) {}

  getStatus() {
    return this.statusCode;
  }

  getBody() {
    return this.body;
  }

  getIsTokenGenRequired() {
    return this.isTokenGenRequired;
  }
}
