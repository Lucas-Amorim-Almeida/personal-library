import { UserParamsType } from "./@types/types";
import AccessLevel from "./AccessLevel";
import Adress from "./Adress";
import Contact from "./Contact";
import PersonalData from "./PersonalData";

export default class User {
  private id?: string;
  private username: string;
  private password: string;
  private access_level: AccessLevel;
  private adress?: Adress;
  private contact?: Contact;
  private personal_data?: PersonalData;
  private created_at?: Date;
  private updated_at?: Date;

  constructor(userData: UserParamsType) {
    this.username = userData.username;
    this.password = userData.password;
    this.access_level = userData.access_level;
    this.adress = userData.adress;
    this.contact = userData.contact;
    this.personal_data = userData.personal_data;
    this.created_at = userData.created_at;
    this.updated_at = userData.updated_at;
  }

  public getId(): string | undefined {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public get(): {
    id?: string;
    username: string;
    password: string;
    access_level: AccessLevel;
    adress?: Adress;
    contact?: Contact;
    personal_data?: PersonalData;
    created_at?: Date;
    updated_at?: Date;
  } {
    return {
      id: this.id,
      username: this.username,
      password: this.password,
      access_level: this.access_level,
      adress: this.adress,
      contact: this.contact,
      personal_data: this.personal_data,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  public setPassword(password: string): void {
    if (!password || password === this.password) {
      throw new Error("An error occurred while changing the password.");
    }
    this.password = password;
  }
}
