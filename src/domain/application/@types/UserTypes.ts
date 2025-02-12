import { PersonalDataParamsType } from "@/domain/core/@types/types";

export type DBOutputUserData = {
  id: string;
  username: string;
  password: string;
  access_level: string;
  contact: DBOutputContactData;
  personal_data: DBOutputPersonalData;
  status: string;
  created_at?: Date;
  updated_at?: Date;
};

export type DBOutputContactData = {
  email: string;
  phone: string[];
  created_at?: Date;
  updated_at?: Date;
};

export type DBOutputPersonalData = {
  name: string;
  birth_date: Date;
  created_at?: Date;
  updated_at?: Date;
};

export type InputChangePassword = {
  id: string;
  current_password: string;
  new_password: string;
};

export type InputUserData = {
  username: string;
  password: string;
  access_level: string;
  contact: {
    email: string;
    phone: string[];
  };
  personal_data: PersonalDataParamsType;
};
