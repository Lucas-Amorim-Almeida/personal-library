import HTTPResponse from "../../../../interfaces/HTTPResponse";

export default class ResponseObject implements HTTPResponse {
  constructor(
    readonly statusCode: number,
    readonly body?: unknown,
  ) {}

  getStatus() {
    return this.statusCode;
  }

  getBody() {
    return this.body;
  }
}
