import AccessLevel from "../AccessLevel";
import Adress from "../Adress";
import Book from "../Book";
import BookGenre from "../BookGenre";
import Contact from "../Contact";
import PersonalData from "../PersonalData";
import ReadingStatus from "../ReadingStatus";
import User from "../User";

export type UserParamsType = {
  username: string;
  password: string;
  access_level: AccessLevel;
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

export type BookParamsType = {
  title: string;
  author: string[];
  edition: string;
  publication_year: number;
  publisher: string;
  publication_location: string;
  isbn?: string;
  volume?: number;
  genre: BookGenre[];
  status: ReadingStatus;
};

export type CollectionParamsType = {
  title: string;
  description: string;
  collection: Book[];
  owner: User;
};
