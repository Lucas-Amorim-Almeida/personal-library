import UseCase from "@/domain/application/UseCase";
import Controller from "../../interfaces/Controller";
import Email from "@/domain/core/valueObjects/Email";
import Phone from "@/domain/core/valueObjects/Phone";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";
import HTTPResponse from "@/infra/interfaces/HTTPResponse";
import ContactUpdateInputBoundary from "@/domain/application/User/ContactUpdate/ContactUpdateInputBoundary";
import ResponseObject from "../http/protocols/ResponseObject";
import { DBOutputContactData } from "@/domain/application/@types/UserTypes";

export default class ContactUpdateController implements Controller {
  constructor(
    readonly useCase: UseCase<
      { user_id: string; email?: Email; phone?: Phone[] },
      DBOutputContactData
    >,
  ) {}

  async handle(req: HTTPRequest): Promise<HTTPResponse> {
    const inputParams = {
      user_id: req.params?.id,
      ...req.body,
    } as { user_id: string; email?: string; phone?: string[] };

    const input = new ContactUpdateInputBoundary(inputParams);
    await this.useCase.execute(input);

    return new ResponseObject(200);
  }
}
