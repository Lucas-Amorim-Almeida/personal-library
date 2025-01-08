import { DBOutputContactData } from "@/application/@types/applicationTypes";
import OutputBoundary from "@/application/OutputBoundary";
import Contact from "@/core/Contact";
import Email from "@/core/valueObjects/Email";
import Phone from "@/core/valueObjects/Phone";

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
