import UseCase from "@/domain/application/UseCase";
import Controller from "../../interfaces/Controller";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";
import HTTPResponse from "@/infra/interfaces/HTTPResponse";
import Presenter from "../../interfaces/Presenter";
import ResponseObject from "../http/protocols/ResponseObject";
import { DBOutputBookData } from "@/domain/application/@types/BookTypes";
import GetBookByIdInputBoundary from "@/domain/application/Book/GetBookByID/GetBookByIdInputBoundary";

export default class GetBookByIdController implements Controller {
  constructor(
    readonly presenter: Presenter,
    readonly useCase: UseCase<{ id: string }, DBOutputBookData>,
  ) {}

  async handle(req: HTTPRequest): Promise<HTTPResponse> {
    const input = new GetBookByIdInputBoundary({ id: req.params?.id } as {
      id: string;
    });
    const [book] = await this.useCase.execute(input);
    const output = this.presenter.output(book.get());

    return new ResponseObject(200, output);
  }
}
