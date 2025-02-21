import UseCase from "@/domain/application/UseCase";
import Controller from "../../interfaces/Controller";
import HTTPRequest from "@/infra/interfaces/HTTPRequest";
import HTTPResponse from "@/infra/interfaces/HTTPResponse";
import ResponseObject from "../http/protocols/ResponseObject";
import {
  DBOutputCollectionData,
  InputCollectionInfoUpdate,
} from "@/domain/application/@types/CollectionTypes";
import UpdateCollectionInfoInputBoundary from "@/domain/application/Collection/UpdateCollectionInfo/UpdateCollectionInfoInputBoundary";

export default class UpdateCollectionInfoController implements Controller {
  constructor(
    readonly useCase: UseCase<
      InputCollectionInfoUpdate,
      DBOutputCollectionData
    >,
  ) {}

  async handle(req: HTTPRequest): Promise<HTTPResponse> {
    const params = {
      collection_id: req.params?.id,
      update_fields: req.body,
    } as {
      collection_id: string;
      update_fields: {
        title?: string;
        description?: string;
        visibility: string;
      };
    };
    const input = new UpdateCollectionInfoInputBoundary(params);

    await this.useCase.execute(input);

    return new ResponseObject(200);
  }
}
