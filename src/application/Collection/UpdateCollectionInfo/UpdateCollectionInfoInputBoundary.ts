import { InputCollectionInfoUpdate } from "@/application/@types/applicationTypes";
import InputBoundary from "@/application/InputBoundary";

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
      throw new Error("Collection id is not valid.");
    }
    if (!title && !description && !visibility) {
      throw new Error("At least update fields is required.");
    }
    if (visibility && visibility !== "public" && visibility !== "private") {
      throw new Error("Visibility is not valid.");
    }
  }

  get(): InputCollectionInfoUpdate {
    return this.inputData as InputCollectionInfoUpdate;
  }
}
