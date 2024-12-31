import { CollectionParamsType } from "@/core/@types/types";
import AccessLevel from "@/core/AccessLevel";
import Book from "@/core/Book";
import BookGenre from "@/core/BookGenre";
import Collection from "@/core/Collection";
import ReadingStatus from "@/core/ReadingStatus";
import User from "@/core/User";

describe("Collection", () => {
  const user: User = new User({
    username: "jonh_doe",
    password: "1234",
    access_level: AccessLevel.COMMON,
  });
  const book: Book = new Book({
    title: "O Senhor dos Anéis: A Sociedade do Anel",
    author: ["J.R.R. Tolkien"],
    edition: "1ª Edição",
    publication_year: 1954,
    publisher: "Allen & Unwin",
    publication_location: "Londres",
    isbn: "978-3-16-148410-0",
    volume: 1,
    genre: [BookGenre.FANTASY, BookGenre.ACTION_ADVENTURE],
    status: ReadingStatus.PENDING,
  });

  const params: CollectionParamsType = {
    title: "Lord of the rings",
    description: "Livros da franquia de Tolkien",
    collection: [book],
    owner: user,
  };
  describe("Constructor", () => {
    it("Should be an instance of Collection", () => {
      expect(new Collection(params)).toBeInstanceOf(Collection);
    });
  });

  describe("get", () => {
    it("Should return an object like CollectionParamsType", () => {
      const collection = new Collection(params);

      expect(collection.get()).toEqual({
        title: params.title,
        description: params.description,
        collection: [expect.any(Book)],
        owner: expect.any(User),
      });
    });
  });
});
