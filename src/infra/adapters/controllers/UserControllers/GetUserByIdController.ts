import UseCase from "@/domain/application/UseCase";
import Controller from "../../interfaces/Controller";
import Presenter from "../../interfaces/Presenter";
import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";
import HTTPResponse from "@/infra/interfaces/HTTPResponse";
import ResponseObject from "../http/protocols/ResponseObject";
import GetUserByIDInputBoundary from "@/domain/application/User/GetUserByID/GetUserByIDInputBoundary";

export default class GetUserByIdController implements Controller {
  constructor(
    readonly presenter: Presenter,
    readonly useCase: UseCase<{ id: string }, DBOutputUserData>,
  ) {}

  async handle(req: HTTPRequest): Promise<HTTPResponse> {
    const inputParams = { id: req.params?.id } as { id: string };
    const input = new GetUserByIDInputBoundary(inputParams);
    const [user] = await this.useCase.execute(input);
    const output = this.presenter.output(user.get());

    return new ResponseObject(200, output);
  }
}
