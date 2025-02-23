import UseCase from "@/domain/application/UseCase";
import Controller from "../../interfaces/Controller";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";
import HTTPResponse from "@/infra/interfaces/HTTPResponse";
import ResponseObject from "../http/protocols/ResponseObject";
import {
  CollectionInput,
  DBOutputCollectionData,
} from "@/domain/application/@types/CollectionTypes";
import UpdateBookInCollectionInputBoundary from "@/domain/application/Collection/UpdateBookInCollection/UpdateBookInCollectionInputBoundary";

type InputDataProps = {
  id: string;
  update_fields: {
    books_collection: {
      book_id: string;
      operation: string;
      status?: string;
    }[];
  };
};

export default class UpdateBookInCollectionController implements Controller {
  constructor(
    readonly useCase: UseCase<CollectionInput, DBOutputCollectionData>,
  ) {}

  async handle(req: HTTPRequest): Promise<HTTPResponse> {
    const params = {
      id: req.params?.id,
      update_fields: req.body,
    };
    const input = new UpdateBookInCollectionInputBoundary(
      params as InputDataProps,
    );

    await this.useCase.execute(input);

    return new ResponseObject(200);
  }
}
