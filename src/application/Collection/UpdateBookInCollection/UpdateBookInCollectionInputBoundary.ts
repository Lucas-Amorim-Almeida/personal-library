import InputBoundary from "@/application/InputBoundary";
import Utils from "@/application/Utils";
import ReadingStatus from "@/core/ReadingStatus";

type Operation = "insert" | "remove" | "update";
type Input = {
  id: string;
  collection: {
    book_id: string;
    operation: Operation;
    status?: ReadingStatus;
  }[];
};

type InputDataProps = {
  id: string;
  collection: {
    book_id: string;
    operation: string;
    status?: string;
  }[];
};

export default class UpdateBookInCollectionInputBoundary
  implements InputBoundary<Input>
{
  private data: Input;
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
    operation: Operation;
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
          operation: operation as Operation,
          status: Utils.define(ReadingStatus, status, "Reading status"),
        }
      : {
          book_id,
          operation: operation as Operation,
        };
  }

  get(): Input {
    return this.data;
  }
}
