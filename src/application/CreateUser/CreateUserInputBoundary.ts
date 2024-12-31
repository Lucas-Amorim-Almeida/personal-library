import {
  ContactParamsType,
  PersonalDataParamsType,
  UserParamsType,
} from "@/core/@types/types";
import AccessLevel from "@/core/AccessLevel";
import Contact from "@/core/Contact";
import PersonalData from "@/core/PersonalData";
import Email from "@/core/valueObjects/Email";
import InputBoundary from "../InputBondary";
import Phone from "@/core/valueObjects/Phone";

type Params = {
  username: string;
  password: string;
  access_level: string;
  contact: {
    email: string;
    phone: string[];
  };
  personal_data: PersonalDataParamsType;
};

export default class CreateUserInputBoundary
  implements InputBoundary<UserParamsType>
{
  private username: string;
  private password: string;
  private access_level: string;
  private contact: ContactParamsType;
  private personal_data: PersonalDataParamsType;

  constructor(inputData: Params) {
    if (!inputData.username || !inputData.password || !inputData.access_level) {
      throw new Error("Required fields are missing.");
    }

    this.username = inputData.username;
    this.password = inputData.password;
    this.contact = {
      email: new Email(inputData.contact.email),
      phone: inputData.contact.phone.map((item) => new Phone(item)),
    };
    this.access_level = inputData.access_level.toUpperCase();
    this.personal_data = inputData.personal_data;
  }

  private defineAcessLevel(): AccessLevel {
    if (!(this.access_level in AccessLevel)) {
      throw new Error("Access level is not valid.");
    }
    return AccessLevel[this.access_level as keyof typeof AccessLevel];
  }

  get(): UserParamsType {
    return {
      username: this.username,
      password: this.password,
      access_level: this.defineAcessLevel(),
      contact: new Contact(this.contact),
      personal_data: new PersonalData(this.personal_data),
    };
  }
}
