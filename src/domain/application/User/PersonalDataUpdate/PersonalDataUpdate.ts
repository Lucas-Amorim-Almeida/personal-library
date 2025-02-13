import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";
import UseCase from "@/domain/application/UseCase";
import Repository from "@/domain/core/Repository";
import PersonalDataUpdateOutputBoundary from "./PersonalDataUpdateOutputBoundary";
import {
  DBOutputPersonalData,
  DBOutputUserData,
} from "@/domain/application/@types/UserTypes";
import InternalError from "../../Errors/InternalError";
import EntityNotFoundError from "../../Errors/EntityNotFoundError";
import FieldRequiredError from "../../Errors/FieldRequiredError";

export default class PersonalDataUpdate
  implements
    UseCase<
      { user_id: string; name?: string; birth_date?: Date },
      DBOutputPersonalData
    >
{
  constructor(readonly repository: Repository) {}

  private updateFieldsAssembler(
    dbPersonalData: DBOutputPersonalData,
    name?: string,
    birth_date?: Date,
  ) {
    return !name
      ? {
          personal_data: {
            name: dbPersonalData.name,
            birth_date,
          },
        }
      : !birth_date
        ? { personal_data: { name, birth_date: dbPersonalData.birth_date } }
        : {
            personal_data: {
              name,
              birth_date,
            },
          };
  }

  async execute(
    inputData: InputBoundary<{
      user_id: string;
      name?: string;
      birth_date?: Date;
    }>,
  ): Promise<OutputBoundary<DBOutputPersonalData>[]> {
    const { user_id, name, birth_date } = inputData.get();
    if (!name && !birth_date) {
      throw new FieldRequiredError("name or birth_date");
    }

    const dbUser: DBOutputUserData | null = await this.repository.getOne({
      _id: user_id,
    });
    if (!dbUser) {
      throw new EntityNotFoundError("User or Personal data");
    }

    const updateResponse: DBOutputUserData | null =
      await this.repository.update({
        query: { _id: user_id },
        update_fields: this.updateFieldsAssembler(
          dbUser.personal_data,
          name,
          birth_date,
        ),
      });
    if (!updateResponse) {
      throw new InternalError();
    }

    return [new PersonalDataUpdateOutputBoundary(updateResponse.personal_data)];
  }
}
