import UseCase from "@/domain/application/UseCase";
import Controller from "../../interfaces/Controller";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";
import HTTPResponse from "@/infra/interfaces/HTTPResponse";
import Presenter from "../../interfaces/Presenter";
import ResponseObject from "../http/protocols/ResponseObject";
import { DBOutputBookData } from "@/domain/application/@types/BookTypes";
import GetBooksInputBoundary from "@/domain/application/Book/GetBooks/GetBooksInputBoundary";

export default class GetBooksController implements Controller {
  constructor(
    readonly presenter: Presenter,
    readonly useCase: UseCase<{ take?: number }, DBOutputBookData>,
  ) {}

  async handle(req: HTTPRequest): Promise<HTTPResponse> {
    const input = new GetBooksInputBoundary(req.query as { take?: number });
    const books = await this.useCase.execute(input);
    const output = books.map((book) => this.presenter.output(book.get()));

    return new ResponseObject(200, output);
  }
}
