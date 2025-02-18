import UseCase from "@/domain/application/UseCase";
import Controller from "../../interfaces/Controller";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";
import HTTPResponse from "@/infra/interfaces/HTTPResponse";
import ResponseObject from "../http/protocols/ResponseObject";
import DeleteBookInputBoundary from "@/domain/application/Book/DeleteBook/DeleteBookInputBoundary";
import InternalServerError from "@/infra/http/Errors/InternalServerError";

export default class DeleteBookController implements Controller {
  constructor(readonly useCase: UseCase<{ id: string }, boolean>) {}

  async handle(req: HTTPRequest): Promise<HTTPResponse> {
    const input = new DeleteBookInputBoundary({
      id: req.params?.id,
    } as { id: string });

    const isDeletedBook = await this.useCase.execute(input);

    if (!isDeletedBook) {
      throw new InternalServerError();
    }

    return new ResponseObject(200);
  }
}
