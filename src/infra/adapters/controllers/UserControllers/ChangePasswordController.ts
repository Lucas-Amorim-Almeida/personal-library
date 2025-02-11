import UseCase from "@/domain/application/UseCase";
import Controller from "../../interfaces/Controller";
import Presenter from "../../interfaces/Presenter";
import {
  DBOutputUserData,
  InputChangePassword,
} from "@/domain/application/@types/UserTypes";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";
import HTTPResponse from "@/infra/interfaces/HTTPResponse";
import ResponseObject from "../http/protocols/ResponseObject";
import ChangePasswordInputBoundary from "@/domain/application/User/ChangePassword/ChangePasswordInputBoundary";

export default class ChangePasswordController implements Controller {
  constructor(
    readonly presenter: Presenter,
    readonly useCase: UseCase<InputChangePassword, DBOutputUserData>,
  ) {}

  async handle(req: HTTPRequest): Promise<HTTPResponse> {
    const inputParams = {
      id: req.params?.id,
      ...req.body,
    } as InputChangePassword;

    const input = new ChangePasswordInputBoundary(inputParams);
    await this.useCase.execute(input);
    //const [user] = await this.useCase.execute(input);
    //const output = this.presenter.output(user.get());

    return new ResponseObject(200);
  }
}
