import { ContactParamsType } from "./@types/types";
import Email from "./valueObjects/Email";
import Phone from "./valueObjects/Phone";

export default class Contact {
  private email: Email;
  private phone: Phone[];
  private created_at?: Date;
  private updated_at?: Date;

  constructor(contactData: ContactParamsType) {
    this.email = contactData.email;
    this.phone = contactData.phone;
    this.created_at = contactData.created_at;
    this.updated_at = contactData.updated_at;
  }

  public get(): {
    email: Email;
    phone: Phone[];
    created_at?: Date;
    updated_at?: Date;
  } {
    return {
      email: this.email,
      phone: this.phone,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
