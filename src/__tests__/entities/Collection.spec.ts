import { CollectionParamsType } from "@/entities/@types/types";
import AccessLevel from "@/entities/AccessLevel";
import Book from "@/entities/Book";
import BookGenre from "@/entities/BookGenre";
import Collection from "@/entities/Collection";
import ReadingStatus from "@/entities/ReadingStatus";
import User from "@/entities/User";

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
    it("Should be a instance of Collection", () => {
      expect(new Collection(params)).toBeInstanceOf(Collection);
    });
  });

  describe("get", () => {
    const collection = new Collection(params);

    expect(collection.get()).toEqual({
      title: params.title,
      description: params.description,
      collection: [expect.any(Book)],
      owner: expect.any(User),
    });
  });
});
