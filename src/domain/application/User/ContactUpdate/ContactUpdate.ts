import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";
import UseCase from "@/domain/application/UseCase";
import Contact from "@/domain/core/Contact";
import Repository from "@/domain/core/Repository";
import Email from "@/domain/core/valueObjects/Email";
import Phone from "@/domain/core/valueObjects/Phone";
import ContactUpdateOutputBoundary from "./ContactUpdateOutputBoundary";
import { DBOutputContactData } from "@/domain/application/@types/UserTypes";
import FieldRequiredError from "../../Errors/FieldRequiredError";
import NotFoundError from "../../Errors/NotFoundError";
import InternalServerError from "../../Errors/InternalServerError";

export default class ContactUpdate
  implements
    UseCase<{ user_id: string; email?: Email; phone?: Phone[] }, Contact>
{
  constructor(readonly repository: Repository) {}

  async execute(
    inputData: InputBoundary<{
      user_id: string;
      email?: Email;
      phone?: Phone[];
    }>,
  ): Promise<OutputBoundary<Contact>[]> {
    const { user_id, email, phone } = inputData.get();

    if (!email && (!phone || phone.length === 0)) {
      throw new FieldRequiredError("Email or Phone");
    }

    const dbResponse: DBOutputContactData | null = await this.repository.getOne(
      { id: user_id },
    );
    if (!dbResponse) {
      throw new NotFoundError("User or Contact");
    }

    const updateResponse: DBOutputContactData | null =
      await this.repository.update({
        query: { id: user_id },
        update_fields: { email, phone },
      });
    if (!updateResponse) {
      throw new InternalServerError();
    }

    return [new ContactUpdateOutputBoundary(updateResponse)];
  }
}
