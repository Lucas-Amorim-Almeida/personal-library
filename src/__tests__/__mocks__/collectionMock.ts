import { DBOutputCollectionData } from "@/domain/application/@types/CollectionTypes";

export const dbCollectionExample = {
  _id: "000001",
  title: "Livros de Tolkien",
  description: "Coleção com os livros de Tolkien.",
  visibility: "private",
  books_collection: [
    {
      book_id: "ID-book0001",
      title: "O Senhor dos aneis",
      author: ["Tolkien"],
      status: "Em leitura",
    },
  ],
  owner: "id-00001",
};

export const dbCollectionExample2: DBOutputCollectionData = {
  _id: "000002",
  title: "Coleção de Fantasia Épica",
  description: "Coleção com obras clássicas de fantasia épica.",
  visibility: "public",
  books_collection: [
    {
      book_id: "id-00002",
      title: "O Hobbit",
      author: ["J. R. R. Tolkien"],
      status: "LEITURA COMPLETA",
    },
    {
      book_id: "id-00003",
      title: "As Crônicas de Nárnia",
      author: ["C. S. Lewis"],
      status: "LEITURA PENDENTE",
    },
    {
      book_id: "id-00004",
      title: "A Saga da Fundação",
      author: ["Isaac Asimov"],
      status: "EM LEITURA",
    },
  ],
  owner: "id-00002",
};

export const inputCollectionExample = {
  title: "Livros de Tolkien",
  description: "Coleção com os livros de Tolkien.",
  visibility: "private",
  books_collection: [{ book_id: "ID-book0001", status: "Em leitura" }],
  owner: "id-00001",
};
