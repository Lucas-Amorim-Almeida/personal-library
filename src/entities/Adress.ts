import { AdressParamsType } from "./@types/types";

export default class Adress {
  private street: string;
  private number: string;
  private city: string;
  private state: string;
  private country: string;
  private zip_code: string;
  private created_at?: Date;
  private updated_at?: Date;

  constructor(adressData: AdressParamsType) {
    this.street = adressData.street;
    this.number = adressData.number;
    this.city = adressData.city;
    this.state = adressData.state;
    this.country = adressData.country;
    this.zip_code = adressData.zip_code;
    this.created_at = adressData.created_at;
    this.updated_at = adressData.updated_at;
  }

  get(): {
    street: string;
    number: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
    created_at?: Date;
    updated_at?: Date;
  } {
    return {
      street: this.street,
      number: this.number,
      city: this.city,
      state: this.state,
      country: this.country,
      zip_code: this.zip_code,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
