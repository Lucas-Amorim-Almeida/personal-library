import { DBOutputContactData } from "@/domain/application/@types/UserTypes";
import OutputBoundary from "@/domain/application/OutputBoundary";
import Contact from "@/domain/core/Contact";
import Email from "@/domain/core/valueObjects/Email";
import Phone from "@/domain/core/valueObjects/Phone";

export default class ContactUpdateOutputBoundary
  implements OutputBoundary<Contact>
{
  private contact: Contact;

  constructor(data: DBOutputContactData) {
    const { created_at, updated_at, phone } = data;
    this.contact = new Contact({
      email: new Email(data.email),
      phone: phone.map((item) => new Phone(item)),
      created_at,
      updated_at,
    });
  }

  get(): Contact {
    return this.contact;
  }
}
