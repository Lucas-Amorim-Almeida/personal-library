import InputBoundary from "@/domain/application/InputBoundary";
import Email from "@/domain/core/valueObjects/Email";
import Phone from "@/domain/core/valueObjects/Phone";
import FieldRequiredError from "../../Errors/FieldRequiredError";

export default class ContactUpdateInputBoundary
  implements InputBoundary<{ user_id: string; email?: Email; phone?: Phone[] }>
{
  private user_id: string;
  private email: Email;
  private phone: Phone[];

  constructor(inputData: { user_id: string; email: string; phone: string[] }) {
    const { user_id, email, phone } = inputData;
    this.user_id = user_id;
    if (!email && (!phone || phone.length === 0)) {
      throw new FieldRequiredError("Email or Phone");
    }

    this.email = new Email(email);
    this.phone = phone.map((item) => new Phone(item));
  }

  get(): { user_id: string; email: Email; phone: Phone[] } {
    return {
      user_id: this.user_id,
      email: this.email,
      phone: this.phone,
    };
  }
}
