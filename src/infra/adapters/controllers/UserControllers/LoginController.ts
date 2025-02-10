import UseCase from "@/domain/application/UseCase";
import Controller from "../../interfaces/Controller";
import Presenter from "../../interfaces/Presenter";
import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";
import HTTPResponse from "@/infra/interfaces/HTTPResponse";
import LoginInputBoundary from "@/domain/application/User/Login/LoginInputBoundary";
import ResponseObject from "../http/protocols/ResponseObject";

export default class LoginController implements Controller {
  constructor(
    readonly presenter: Presenter,
    readonly useCase: UseCase<
      { username: string; password: string },
      DBOutputUserData
    >,
  ) {}

  async handle(req: HTTPRequest): Promise<HTTPResponse> {
    const input = new LoginInputBoundary(
      req.body as { username: string; password: string },
    );
    const [user] = await this.useCase.execute(input);
    const output = this.presenter.output(user.get());

    return new ResponseObject(200, output);
  }
}
