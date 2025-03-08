import BookGenre from "@/domain/core/BookGenre";

export type DBOutputBookData = {
  _id: string;
  title: string;
  author: string[];
  edition: string;
  publication_year: number;
  publisher: string;
  publication_location: string;
  isbn?: string;
  volume?: number;
  genre: string[];
  created_at?: Date;
  updated_at?: Date;
  inserted_by: string;
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
  inserted_by: string;
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
