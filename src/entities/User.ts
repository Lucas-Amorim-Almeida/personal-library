import { UserParamsType } from "./@types/types";

export default class User {
  private id?: string;
  private username: string;
  private password: string;
  private adress?: object;
  private contact?: object;
  private personal_data?: object;
  private created_at?: Date;
  private updated_at?: Date;

  constructor(userData: UserParamsType) {
    this.username = userData.username;
    this.password = userData.password;
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
    adress?: object;
    contact?: object;
    personal_data?: object;
    created_at?: Date;
    updated_at?: Date;
  } {
    return {
      id: this.id,
      username: this.username,
      password: this.password,
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
