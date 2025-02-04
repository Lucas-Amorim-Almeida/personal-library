import { PersonalDataParamsType } from "@/domain/core/@types/types";

export type DBOutputUserData = {
  id: string;
  username: string;
  password: string;
  access_level: string;
  status: string;
  created_at?: Date;
  updated_at?: Date;
};

export type DBOutputContactData = {
  id: string;
  email: string;
  phone: string[];
  created_at?: Date;
  updated_at?: Date;
};

export type DBOutputPersonalData = {
  id: string;
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
