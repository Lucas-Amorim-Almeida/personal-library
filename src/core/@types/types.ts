import AccessLevel from "../AccessLevel";
import Book from "../Book";
import BookGenre from "../BookGenre";
import Contact from "../Contact";
import PersonalData from "../PersonalData";
import ReadingStatus from "../ReadingStatus";
import User from "../User";
import Email from "../valueObjects/Email";
import Phone from "../valueObjects/Phone";

export type UserParamsType = {
  username: string;
  password: string;
  access_level: AccessLevel;
  contact?: Contact;
  personal_data?: PersonalData;
  created_at?: Date;
  updated_at?: Date;
};

export type ContactParamsType = {
  email: Email;
  phone: Phone[];
  created_at?: Date;
  updated_at?: Date;
};

export type PersonalDataParamsType = {
  name: string;
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
  created_at?: Date;
  updated_at?: Date;
};

export type CollectionParamsType = {
  title: string;
  description: string;
  collection: Book[];
  owner: User;
  created_at?: Date;
  updated_at?: Date;
};
