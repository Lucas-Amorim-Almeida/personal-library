import { DBOutputContactData } from "@/application/@types/applicationTypes";
import InputBoundary from "@/application/InputBoundary";
import OutputBoundary from "@/application/OutputBoundary";
import UseCase from "@/application/UseCase";
import Contact from "@/core/Contact";
import Repository from "@/core/Repository";
import Email from "@/core/valueObjects/Email";
import Phone from "@/core/valueObjects/Phone";
import ContactUpdateOutputBoundary from "./ContactUpdateOutputBoundary";

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
      throw new Error("Email or Phone is required.");
    }

    const dbResponse: DBOutputContactData | null = await this.repository.getOne(
      { id: user_id },
    );
    if (!dbResponse) {
      throw new Error("User or Contact not found.");
    }

    const updateResponse: DBOutputContactData | null =
      await this.repository.update({ id: user_id, email, phone });
    if (!updateResponse) {
      throw new Error("An internal server error occurred.");
    }

    return [new ContactUpdateOutputBoundary(updateResponse)];
  }
}
