import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";
import UseCase from "@/domain/application/UseCase";
import PersonalData from "@/domain/core/PersonalData";
import Repository from "@/domain/core/Repository";
import PersonalDataUpdateOutputBoundary from "./PersonalDataUpdateOutputBoundary";
import { DBOutputPersonalData } from "@/domain/application/@types/UserTypes";
import InternalServerError from "../../Errors/InternalServerError";
import NotFoundError from "../../Errors/NotFoundError";
import FieldRequiredError from "../../Errors/FieldRequiredError";

export default class PersonalDataUpdate
  implements
    UseCase<{ user_id: string; name?: string; birth_date?: Date }, PersonalData>
{
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{
      user_id: string;
      name?: string;
      birth_date?: Date;
    }>,
  ): Promise<OutputBoundary<PersonalData>[]> {
    const { user_id, name, birth_date } = inputData.get();
    if (!name && !birth_date) {
      throw new FieldRequiredError("name or birth_date");
    }

    const dbPersonalData: DBOutputPersonalData | null =
      await this.repository.getOne({ id: user_id });
    if (!dbPersonalData) {
      throw new NotFoundError("User or Personal data");
    }

    const updateResponse: DBOutputPersonalData | null =
      await this.repository.update({
        query: { id: user_id },
        update_fields: { name, birth_date },
      });
    if (!updateResponse) {
      throw new InternalServerError();
    }

    return [new PersonalDataUpdateOutputBoundary(updateResponse)];
  }
}
