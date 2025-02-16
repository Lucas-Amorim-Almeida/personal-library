import UseCase from "@/domain/application/UseCase";
import Controller from "../../interfaces/Controller";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";
import HTTPResponse from "@/infra/interfaces/HTTPResponse";
import ResponseObject from "../http/protocols/ResponseObject";
import {
  DBOutputBookData,
  InputBookUpdate,
} from "@/domain/application/@types/BookTypes";
import UpdateBookInputBoundary from "@/domain/application/Book/UpdateBook/UpdateBookInputBoundary";

type InputBookUpdateRequestData = {
  id: string;
  title?: string;
  author?: string[];
  edition?: string;
  publication_year?: number;
  publisher?: string;
  publication_location?: string;
  isbn?: string;
  volume?: number;
  genre?: string[];
};

export default class UpdateBookController implements Controller {
  constructor(readonly useCase: UseCase<InputBookUpdate, DBOutputBookData>) {}

  async handle(req: HTTPRequest): Promise<HTTPResponse> {
    const inputReq = {
      id: req.params?.id,
      ...req.body,
    } as InputBookUpdateRequestData;
    const input = new UpdateBookInputBoundary(inputReq);
    await this.useCase.execute(input);

    return new ResponseObject(200);
  }
}
