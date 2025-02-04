import Controller from "@/infra/adapters/interfaces/Controller";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";
import HTTPResponse from "@/infra/interfaces/HTTPResponse";
import { Request, Response } from "express";

export default class CreateUserRouteAdapter {
  constructor(
    readonly req: Request,
    readonly res: Response,
  ) {}

  async handle(controller: Controller) {
    const httpRequest: HTTPRequest = { body: this.req.body };
    const httpResponse: HTTPResponse = await controller.handle(httpRequest);

    return this.res.status(httpResponse.statusCode).json(httpResponse.body);
  }
}
