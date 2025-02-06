import {
  CollectionInput,
  CollectionUpdateOperation,
} from "@/domain/application/@types/CollectionTypes";
import InputBoundary from "@/domain/application/InputBoundary";
import Utils from "@/domain/application/Utils";
import ReadingStatus from "@/domain/core/ReadingStatus";
import FieldRequiredError from "../../Errors/FieldRequiredError";
import InvalidFieldError from "../../Errors/InvalidFieldError";

type InputDataProps = {
  id: string;
  collection: {
    book_id: string;
    operation: string;
    status?: string;
  }[];
};

export default class UpdateBookInCollectionInputBoundary
  implements InputBoundary<CollectionInput>
{
  private data: CollectionInput;
  constructor(inputData: InputDataProps) {
    const { id, collection } = inputData;
    if (!id) {
      throw new FieldRequiredError("Id");
    }
    this.data = {
      id,
      collection: collection.map((inputItem) =>
        this.inputItemAssembler(inputItem),
      ),
    };
  }

  private validateOperation(operation: string): boolean {
    return (
      operation === "insert" || operation === "remove" || operation === "update"
    );
  }

  private inputItemAssembler({
    book_id,
    operation,
    status,
  }: {
    book_id: string;
    operation: string;
    status?: string;
  }): {
    book_id: string;
    operation: CollectionUpdateOperation;
    status?: ReadingStatus;
  } {
    if (!book_id) {
      throw new FieldRequiredError("book_id");
    }

    if (!this.validateOperation(operation.toLowerCase())) {
      throw new InvalidFieldError("Operation");
    }

    return status
      ? {
          book_id,
          operation: operation as CollectionUpdateOperation,
          status: Utils.define(ReadingStatus, status, "Reading status"),
        }
      : {
          book_id,
          operation: operation as CollectionUpdateOperation,
        };
  }

  get(): CollectionInput {
    return this.data;
  }
}
