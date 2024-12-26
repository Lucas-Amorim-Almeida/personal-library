import Adress from "../Adress";
import Contact from "../Contact";
import PersonalData from "../PersonalData";

export type UserParamsType = {
  username: string;
  password: string;
  adress?: Adress;
  contact?: Contact;
  personal_data?: PersonalData;
  created_at?: Date;
  updated_at?: Date;
};

export type AdressParamsType = {
  street: string;
  number: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  created_at?: Date;
  updated_at?: Date;
};

export type ContactParamsType = {
  email: string;
  phone: string[];
  created_at?: Date;
  updated_at?: Date;
};

export type PersonalDataParamsType = {
  name: string;
  cpf: string;
  birth_date: Date;
  created_at?: Date;
  updated_at?: Date;
};
