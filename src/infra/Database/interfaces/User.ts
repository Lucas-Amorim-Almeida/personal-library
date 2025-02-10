import AccessLevel from "@/domain/core/AccessLevel";
import UserStatus from "@/domain/core/UserStatus";
import { Document } from "mongoose";

export interface IContact {
  email: string;
  phone: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPersonalData {
  name: string;
  birth_date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser extends Document {
  username: string;
  password: string;
  access_level: AccessLevel;
  contact?: IContact;
  personal_data?: IPersonalData;
  status: UserStatus;
}
