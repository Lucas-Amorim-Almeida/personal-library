import UseCase from "@/domain/application/UseCase";
import Controller from "../../interfaces/Controller";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";
import HTTPResponse from "@/infra/interfaces/HTTPResponse";
import Presenter from "../../interfaces/Presenter";
import ResponseObject from "../http/protocols/ResponseObject";
import { DBOutputCollectionData } from "@/domain/application/@types/CollectionTypes";
import GetCollectionByIDInputBoundary from "@/domain/application/Collection/GetCollectionByID/GetCollectionByIDInputBoundary";

export default class GetCollectionByIdController implements Controller {
  constructor(
    readonly presenter: Presenter,
    readonly useCase: UseCase<
      { collection_id: string },
      DBOutputCollectionData
    >,
  ) {}

  async handle(req: HTTPRequest): Promise<HTTPResponse> {
    const input = new GetCollectionByIDInputBoundary({
      collection_id: req.params?.id,
    } as { collection_id: string });

    const [collection] = await this.useCase.execute(input);
    const output = this.presenter.output(collection.get());

    return new ResponseObject(200, output);
  }
}
