import UseCase from "@/domain/application/UseCase";
import Controller from "../../interfaces/Controller";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";
import HTTPResponse from "@/infra/interfaces/HTTPResponse";
import Presenter from "../../interfaces/Presenter";
import ResponseObject from "../http/protocols/ResponseObject";
import Book from "@/domain/core/Book";
import {
  DBOutputBookData,
  InputBook,
} from "@/domain/application/@types/BookTypes";
import CreateBookInputBoundary from "@/domain/application/Book/CreateBook/CreateBookInputBoundary";

export default class CreateBookController implements Controller {
  constructor(
    readonly presenter: Presenter,
    readonly useCase: UseCase<Book, DBOutputBookData>,
  ) {}

  async handle(req: HTTPRequest): Promise<HTTPResponse> {
    const input = new CreateBookInputBoundary(req.body as InputBook);
    const [book] = await this.useCase.execute(input);
    const output = this.presenter.output(book.get());

    return new ResponseObject(201, output);
  }
}
