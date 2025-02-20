import UseCase from "@/domain/application/UseCase";
import Controller from "../../interfaces/Controller";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";
import HTTPResponse from "@/infra/interfaces/HTTPResponse";
import Presenter from "../../interfaces/Presenter";
import ResponseObject from "../http/protocols/ResponseObject";
import { DBOutputCollectionData } from "@/domain/application/@types/CollectionTypes";
import GetCollectionOfUserInputBoundary from "@/domain/application/Collection/GetCollectionOfUser/GetCollectionOfUserInputBoundary";

export default class GetCollectionOfUserController implements Controller {
  constructor(
    readonly presenter: Presenter,
    readonly useCase: UseCase<{ user_id: string }, DBOutputCollectionData>,
  ) {}

  async handle(req: HTTPRequest): Promise<HTTPResponse> {
    const input = new GetCollectionOfUserInputBoundary({
      user_id: req.params?.user_id,
    } as { user_id: string });

    const collections = await this.useCase.execute(input);
    const output = collections.map((collection) =>
      this.presenter.output(collection.get()),
    );

    return new ResponseObject(200, output);
  }
}
