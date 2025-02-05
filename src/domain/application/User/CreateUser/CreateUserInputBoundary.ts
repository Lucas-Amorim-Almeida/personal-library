import {
  ContactParamsType,
  PersonalDataParamsType,
  UserParamsType,
} from "@/domain/core/@types/types";
import AccessLevel from "@/domain/core/AccessLevel";
import Contact from "@/domain/core/Contact";
import PersonalData from "@/domain/core/PersonalData";
import Email from "@/domain/core/valueObjects/Email";
import InputBoundary from "../../InputBoundary";
import Phone from "@/domain/core/valueObjects/Phone";
import Utils from "@/domain/application/Utils";
import { InputUserData } from "../../@types/UserTypes";
import FieldRequiredError from "../../Errors/FieldRequiredError";

export default class CreateUserInputBoundary
  implements InputBoundary<UserParamsType>
{
  private username: string;
  private password: string;
  private access_level: string;
  private contact: ContactParamsType;
  private personal_data: PersonalDataParamsType;

  constructor(inputData: InputUserData) {
    if (!inputData.username || !inputData.password || !inputData.access_level) {
      throw new FieldRequiredError("At least");
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

  get(): UserParamsType {
    return {
      username: this.username,
      password: this.password,
      access_level: Utils.define(
        AccessLevel,
        this.access_level,
        "Access level",
      ),
      contact: new Contact(this.contact),
      personal_data: new PersonalData(this.personal_data),
    };
  }
}
