import UseCase from "@/domain/application/UseCase";
import HTTPRequest from "../../interfaces/HTTPRequest";
import HTTPResponse from "@/infra/interfaces/HTTPResponse";
import Presenter from "./Presenter";

export default interface Controller {
  readonly presenter?: Presenter;
  readonly useCase: UseCase<unknown, unknown>;

  handle(req: HTTPRequest): Promise<HTTPResponse>;
}
