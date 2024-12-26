import { ContactParamsType } from "./@types/types";

export default class Contact {
  private email: string;
  private phone: string[];
  private created_at?: Date;
  private updated_at?: Date;

  constructor(contactData: ContactParamsType) {
    this.email = contactData.email;
    this.phone = contactData.phone;
    this.created_at = contactData.created_at;
    this.updated_at = contactData.updated_at;
  }

  public get(): {
    email: string;
    phone: string[];
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
