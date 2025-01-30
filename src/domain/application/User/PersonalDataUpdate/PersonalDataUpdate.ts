import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";
import UseCase from "@/domain/application/UseCase";
import PersonalData from "@/domain/core/PersonalData";
import Repository from "@/domain/core/Repository";
import PersonalDataUpdateOutputBoundary from "./PersonalDataUpdateOutputBoundary";
import { DBOutputPersonalData } from "@/domain/application/@types/UserTypes";

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
      throw new Error("name or birth_date is required.");
    }

    const dbPersonalData: DBOutputPersonalData | null =
      await this.repository.getOne({ id: user_id });
    if (!dbPersonalData) {
      throw new Error("User or Personal data not found.");
    }

    const updateResponse: DBOutputPersonalData | null =
      await this.repository.update({ id: user_id, name, birth_date });
    if (!updateResponse) {
      throw new Error("An internal server error has occurred.");
    }

    return [new PersonalDataUpdateOutputBoundary(updateResponse)];
  }
}
