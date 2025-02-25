import UseCase from "@/domain/application/UseCase";
import HTTPRequest from "../../../interfaces/HTTPRequest";
import { UserParamsType } from "@/domain/core/@types/types";
import CreateUserInputBoundary from "@/domain/application/User/CreateUser/CreateUserInputBoundary";
import {
  DBOutputUserData,
  InputUserData,
} from "@/domain/application/@types/UserTypes";
import ResponseObject from "../http/protocols/ResponseObject";
import Presenter from "../../interfaces/Presenter";
import Controller from "../../interfaces/Controller";
import HTTPResponse from "../../../interfaces/HTTPResponse";

export default class CreateUserController implements Controller {
  constructor(
    readonly presenter: Presenter,
    readonly useCase: UseCase<UserParamsType, DBOutputUserData>,
  ) {}

  async handle(req: HTTPRequest): Promise<HTTPResponse> {
    const input = new CreateUserInputBoundary(req.body as InputUserData);
    const [user] = await this.useCase.execute(input);
    const output = this.presenter.output(user.get());

    const isGenTokenRequired = true;
    return new ResponseObject(201, output, isGenTokenRequired);
  }
}
