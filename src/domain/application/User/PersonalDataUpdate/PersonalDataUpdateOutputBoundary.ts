import { DBOutputPersonalData } from "@/domain/application/@types/UserTypes";
import OutputBoundary from "@/domain/application/OutputBoundary";

export default class PersonalDataUpdateOutputBoundary
  implements OutputBoundary<DBOutputPersonalData>
{
  constructor(private readonly data: DBOutputPersonalData) {}

  get(): DBOutputPersonalData {
    return this.data;
  }
}
