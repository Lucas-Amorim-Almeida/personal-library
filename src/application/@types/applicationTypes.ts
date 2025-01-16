import BookGenre from "@/core/BookGenre";

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

export type DBOutputBookData = {
  id: string;
  title: string;
  author: string[];
  edition: string;
  publication_year: number;
  publisher: string;
  publication_location: string;
  isbn?: string;
  volume?: number;
  genre: string[];
  status: string;
  created_at?: Date;
  updated_at?: Date;
};

export type InputBook = {
  title: string;
  author: string[];
  edition: string;
  publication_year: number;
  publisher: string;
  publication_location: string;
  isbn?: string;
  volume?: number;
  genre: string[];
  status: string;
};

export type InputBookUpdate = {
  id: string;
  title?: string;
  author?: string[];
  edition?: string;
  publication_year?: number;
  publisher?: string;
  publication_location?: string;
  isbn?: string;
  volume?: number;
  genre?: BookGenre[];
};
