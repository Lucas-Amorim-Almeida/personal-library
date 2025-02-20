import UseCase from "@/domain/application/UseCase";
import Controller from "../../interfaces/Controller";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";
import HTTPResponse from "@/infra/interfaces/HTTPResponse";
import Presenter from "../../interfaces/Presenter";
import ResponseObject from "../http/protocols/ResponseObject";
import CreateCollectionInputBoundary from "@/domain/application/Collection/CreteCollection/CreateCollectionInputBoundary";
import {
  ColletionInputData,
  DBOutputCollectionData,
} from "@/domain/application/@types/CollectionTypes";

type InputCollection = { user_id: string } & Omit<ColletionInputData, "owner">;

export default class CreateCollectionController implements Controller {
  constructor(
    readonly presenter: Presenter,
    readonly useCase: UseCase<ColletionInputData, DBOutputCollectionData>,
  ) {}

  async handle(req: HTTPRequest): Promise<HTTPResponse> {
    const input = new CreateCollectionInputBoundary(
      req.body as InputCollection,
    );

    const [collection] = await this.useCase.execute(input);
    const output = this.presenter.output(collection.get());

    return new ResponseObject(201, output);
  }
}
