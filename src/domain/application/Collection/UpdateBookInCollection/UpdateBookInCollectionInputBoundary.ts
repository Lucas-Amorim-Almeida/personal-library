import {
  CollectionInput,
  CollectionUpdateOperation,
} from "@/domain/application/@types/CollectionTypes";
import InputBoundary from "@/domain/application/InputBoundary";
import Utils from "@/domain/application/Utils";
import ReadingStatus from "@/domain/core/ReadingStatus";

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
      throw new Error("Id is required.");
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
      throw new Error("book_id is required.");
    }

    if (!this.validateOperation(operation.toLowerCase())) {
      throw new Error("Operation is not valid.");
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
