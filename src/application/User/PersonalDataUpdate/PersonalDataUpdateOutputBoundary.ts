import { DBOutputPersonalData } from "@/application/@types/applicationTypes";
import OutputBoundary from "@/application/OutputBoundary";
import PersonalData from "@/core/PersonalData";

export default class PersonalDataUpdateOutputBoundary
  implements OutputBoundary<PersonalData>
{
  private personalData: PersonalData;

  constructor(data: DBOutputPersonalData) {
    const { name, birth_date, created_at, updated_at } = data;

    this.personalData = new PersonalData({
      name,
      birth_date,
      created_at,
      updated_at,
    });
  }

  get(): PersonalData {
    return this.personalData;
  }
}
