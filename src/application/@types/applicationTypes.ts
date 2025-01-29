import BookGenre from "@/core/BookGenre";
import ReadingStatus from "@/core/ReadingStatus";

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

export type CollectionUpdateOperation = "insert" | "remove" | "update";

export type CollectionBookFromRequest = {
  book_id: string;
  operation: CollectionUpdateOperation;
  status?: ReadingStatus;
};
export type CollectionInput = {
  id: string;
  collection: CollectionBookFromRequest[];
};

export type DBCollectionBook = {
  book_id: string;
  title: string;
  author: string[];
  status: string;
};

export type DBOutputCollectionData = {
  id: string;
  title: string;
  description: string;
  visibility: "public" | "private";
  collection: DBCollectionBook[];
  owner: string;
};

export type ColletionInputData = {
  title: string;
  description: string;
  visibility: "public" | "private";
  collection: { book_id: string; status: string }[];
  owner: string;
};

export type InputCollectionInfoUpdate = {
  colletion_id: string;
  update_fields: {
    title?: string;
    description?: string;
    visibility?: "public" | "private";
  };
};
