import Controller from "@/infra/adapters/interfaces/Controller";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";
import HTTPResponse from "@/infra/interfaces/HTTPResponse";
import { Request, Response } from "express";
import HTTPErrorsAdapater from "./HTTPErrorsAdapater";
import JsonWebToken from "@/utils/JsonWebToken";
import { JWTPayload } from "../interfaces/TokenManager";

export default class RouterAdapter {
  constructor(
    readonly req: Request,
    readonly res: Response,
    private readonly tokenManager: JsonWebToken = new JsonWebToken(),
  ) {}

  async handle(controller: Controller) {
    try {
      const httpRequest: HTTPRequest = {
        body: this.req.body,
        params: this.req.params,
        query: this.req.query,
      };
      const httpResponse: HTTPResponse = await controller.handle(httpRequest);

      if (httpResponse.isTokenGenRequired) {
        return this.res
          .status(httpResponse.statusCode)
          .cookie(
            "jwt",
            this.tokenManager.tokenGenerator(httpResponse.body as JWTPayload),
          )
          .json(httpResponse.body);
      }
      return this.res.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error) {
      const httpErrorAdapter = new HTTPErrorsAdapater(error as Error);
      throw httpErrorAdapter.handle();
    }
  }
}
