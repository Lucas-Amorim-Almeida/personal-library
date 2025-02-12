import { DBOutputContactData } from "@/domain/application/@types/UserTypes";
import OutputBoundary from "@/domain/application/OutputBoundary";

export default class ContactUpdateOutputBoundary
  implements OutputBoundary<DBOutputContactData>
{
  constructor(private readonly contact: DBOutputContactData) {}

  get(): DBOutputContactData {
    return this.contact;
  }
}
