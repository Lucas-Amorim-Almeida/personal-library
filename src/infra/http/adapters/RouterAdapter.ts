import Controller from "@/infra/adapters/interfaces/Controller";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";
import HTTPResponse from "@/infra/interfaces/HTTPResponse";
import { Request, Response } from "express";
import HTTPErrorsAdapater from "./HTTPErrorsAdapater";

export default class RouterAdapter {
  constructor(
    readonly req: Request,
    readonly res: Response,
  ) {}

  async handle(controller: Controller) {
    try {
      const httpRequest: HTTPRequest = {
        body: this.req.body,
        params: this.req.params,
        query: this.req.query,
      };
      const httpResponse: HTTPResponse = await controller.handle(httpRequest);

      return this.res.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error) {
      const httpErrorAdapter = new HTTPErrorsAdapater(error as Error);
      throw httpErrorAdapter.handle();
    }
  }
}
