import UseCase from "@/domain/application/UseCase";
import Controller from "../../interfaces/Controller";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";
import HTTPResponse from "@/infra/interfaces/HTTPResponse";
import ResponseObject from "../http/protocols/ResponseObject";
import UserStatus from "@/domain/core/UserStatus";
import { DBOutputUserData } from "@/domain/application/@types/UserTypes";
import UserStatusInputBoundary from "@/domain/application/User/UserStatusUpdate/UserStatusUpdateInputBoundary";

export default class UserStatusUpdateController implements Controller {
  constructor(
    readonly useCase: UseCase<
      { id: string; status: UserStatus },
      DBOutputUserData
    >,
  ) {}

  async handle(req: HTTPRequest): Promise<HTTPResponse> {
    const inputParams = {
      id: req.params?.id,
      ...req.body,
    } as { id: string; status: UserStatus };

    const input = new UserStatusInputBoundary(inputParams);
    await this.useCase.execute(input);

    return new ResponseObject(200);
  }
}
