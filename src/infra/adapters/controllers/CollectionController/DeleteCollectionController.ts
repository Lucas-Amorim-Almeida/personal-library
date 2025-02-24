import UseCase from "@/domain/application/UseCase";
import Controller from "../../interfaces/Controller";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";
import HTTPResponse from "@/infra/interfaces/HTTPResponse";
import ResponseObject from "../http/protocols/ResponseObject";
import DeleteCollectionInputBoundary from "@/domain/application/Collection/DeleteCollection/DeleteCollectionInputBoundary";

export default class DeleteCollectionController implements Controller {
  constructor(readonly useCase: UseCase<{ id: string }, boolean>) {}

  async handle(req: HTTPRequest): Promise<HTTPResponse> {
    const input = new DeleteCollectionInputBoundary({ id: req.params?.id } as {
      id: string;
    });

    await this.useCase.execute(input);

    return new ResponseObject(200);
  }
}
