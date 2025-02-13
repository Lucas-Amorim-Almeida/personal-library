import InputBoundary from "@/domain/application/InputBoundary";
import OutputBoundary from "@/domain/application/OutputBoundary";
import UseCase from "@/domain/application/UseCase";
import Repository from "@/domain/core/Repository";
import Email from "@/domain/core/valueObjects/Email";
import Phone from "@/domain/core/valueObjects/Phone";
import ContactUpdateOutputBoundary from "./ContactUpdateOutputBoundary";
import {
  DBOutputContactData,
  DBOutputUserData,
} from "@/domain/application/@types/UserTypes";
import FieldRequiredError from "../../Errors/FieldRequiredError";
import EntityNotFoundError from "../../Errors/EntityNotFoundError";
import InternalError from "../../Errors/InternalError";

export default class ContactUpdate
  implements
    UseCase<
      { user_id: string; email?: Email; phone?: Phone[] },
      DBOutputContactData
    >
{
  constructor(readonly repository: Repository) {}

  private updateFieldsAssembler(
    dbContact: DBOutputContactData,
    email: Email | undefined,
    phone: Phone[] | undefined,
  ) {
    return !email
      ? {
          contact: {
            email: dbContact.email,
            phone: phone?.map((item) => item.get()),
          },
        }
      : phone?.length === 0
        ? { contact: { email: email.get(), phone: dbContact.phone } }
        : {
            contact: {
              email: email.get(),
              phone: phone?.map((item) => item.get()),
            },
          };
  }

  async execute(
    inputData: InputBoundary<{
      user_id: string;
      email?: Email;
      phone?: Phone[];
    }>,
  ): Promise<OutputBoundary<DBOutputContactData>[]> {
    const { user_id, email, phone } = inputData.get();

    if (!email && (!phone || phone.length === 0)) {
      throw new FieldRequiredError("Email or Phone");
    }

    const dbResponse: DBOutputUserData | null = await this.repository.getOne({
      _id: user_id,
    });
    if (!dbResponse) {
      throw new EntityNotFoundError("User");
    }

    const fieldsToUpdate = this.updateFieldsAssembler(
      dbResponse.contact,
      email,
      phone,
    );

    const updateResponse: DBOutputUserData | null =
      await this.repository.update({
        query: { _id: user_id },
        update_fields: fieldsToUpdate,
      });
    if (!updateResponse) {
      throw new InternalError();
    }

    return [new ContactUpdateOutputBoundary(updateResponse.contact)];
  }
}
