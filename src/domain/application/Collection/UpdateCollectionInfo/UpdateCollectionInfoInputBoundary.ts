import { InputCollectionInfoUpdate } from "@/domain/application/@types/CollectionTypes";
import InputBoundary from "@/domain/application/InputBoundary";
import InvalidFieldError from "../../Errors/InvalidFieldError";
import FieldRequiredError from "../../Errors/FieldRequiredError";

export default class UpdateCollectionInfoInputBoundary
  implements InputBoundary<InputCollectionInfoUpdate>
{
  constructor(
    private readonly inputData: {
      colletion_id: string;
      update_fields: {
        title?: string;
        description?: string;
        visibility?: string;
      };
    },
  ) {
    const { title, description, visibility } = inputData.update_fields;

    if (!inputData.colletion_id) {
      throw new InvalidFieldError("Collection id");
    }
    if (!title && !description && !visibility) {
      throw new FieldRequiredError("At least update fields");
    }
    if (visibility && visibility !== "public" && visibility !== "private") {
      throw new InvalidFieldError("Visibility");
    }
  }

  get(): InputCollectionInfoUpdate {
    return this.inputData as InputCollectionInfoUpdate;
  }
}
