import UseCase from "@/domain/application/UseCase";
import Controller from "../../interfaces/Controller";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";
import HTTPResponse from "@/infra/interfaces/HTTPResponse";
import Presenter from "../../interfaces/Presenter";
import ResponseObject from "../http/protocols/ResponseObject";
import { DBOutputBookData } from "@/domain/application/@types/BookTypes";
import SearchBookInputBoundary from "@/domain/application/Book/SearchBook/SearchBookInputBoundary";

export default class SearchBookController implements Controller {
  constructor(
    readonly presenter: Presenter,
    readonly useCase: UseCase<
      {
        title?: string;
        author?: string;
        take?: number;
      },
      DBOutputBookData
    >,
  ) {}

  async handle(req: HTTPRequest): Promise<HTTPResponse> {
    const input = new SearchBookInputBoundary(
      req.query as {
        title?: string;
        author?: string;
        take?: number;
      },
    );
    const books = await this.useCase.execute(input);
    const output = books.map((book) => this.presenter.output(book.get()));

    return new ResponseObject(200, output);
  }
}
