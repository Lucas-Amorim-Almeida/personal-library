import UseCase from "@/domain/application/UseCase";
import Controller from "../../interfaces/Controller";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";
import HTTPResponse from "@/infra/interfaces/HTTPResponse";
import { DBOutputPersonalData } from "@/domain/application/@types/UserTypes";
import PersonalDataUpdateInputBoundary from "@/domain/application/User/PersonalDataUpdate/PersonalDataUpdateInputBoundary";
import ResponseObject from "../http/protocols/ResponseObject";

export default class PersonalDataUpdateController implements Controller {
  constructor(
    readonly useCase: UseCase<
      { user_id: string; name?: string; birth_date?: Date },
      DBOutputPersonalData
    >,
  ) {}

  async handle(req: HTTPRequest): Promise<HTTPResponse> {
    const inputParams = {
      user_id: req.params?.id,
      ...req.body,
    } as { user_id: string; name?: string; birth_date?: Date };

    const input = new PersonalDataUpdateInputBoundary(inputParams);
    await this.useCase.execute(input);

    return new ResponseObject(200);
  }
}
