import BookGenre from "@/domain/core/BookGenre";

export default interface IBook {
  title: string;
  author: string[];
  edition: string;
  publication_year: number;
  publisher: string;
  publication_location: string;
  isbn?: string;
  volume?: number;
  genre: BookGenre[];
  created_at?: Date;
  updated_at?: Date;
}
