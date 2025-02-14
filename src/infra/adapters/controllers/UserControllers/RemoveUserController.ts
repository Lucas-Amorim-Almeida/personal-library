import UseCase from "@/domain/application/UseCase";
import Controller from "../../interfaces/Controller";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";
import HTTPResponse from "@/infra/interfaces/HTTPResponse";
import ResponseObject from "../http/protocols/ResponseObject";
import RemoveUserInputBoundary from "@/domain/application/User/RemoveUser/RemoveUserInputBoundary";
import InternalServerError from "@/infra/http/Errors/InternalServerError";

export default class RemoveUserController implements Controller {
  constructor(readonly useCase: UseCase<{ id: string }, boolean>) {}

  async handle(req: HTTPRequest): Promise<HTTPResponse> {
    const inputParams = {
      id: req.params?.id,
    } as { id: string };

    const input = new RemoveUserInputBoundary(inputParams);
    const isDeleted = await this.useCase.execute(input);
    if (!isDeleted) {
      throw new InternalServerError();
    }

    return new ResponseObject(200);
  }
}
