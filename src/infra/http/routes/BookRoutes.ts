import { Router } from "express";
import RouterAdapter from "../adapters/RouterAdapter";
import CreateBookFactory from "../factories/BookFactory/CreateBookFactory";
import GetBooksFactory from "../factories/BookFactory/GetBooksFactory";
import UpdateBookFactory from "../factories/BookFactory/UpdateBookFactory";
import DeleteBookFactory from "../factories/BookFactory/DeleteBookFactory";

const bookRoutes = Router();
const createBookController = new CreateBookFactory().getController();
const getBooksController = new GetBooksFactory().getController();
const updateBookController = new UpdateBookFactory().getController();
const deleteBookController = new DeleteBookFactory().getController();

//Este é um módulo que contém as rotas para Book. Logo, id se refere ao id do livro.

//Salvar informações de um novo livro
bookRoutes.post("/", async (req, res) => {
  await new RouterAdapter(req, res).handle(createBookController);
});

//Obter informações de varaios ou todos os livros da base de dados
bookRoutes.get("/", async (req, res) => {
  await new RouterAdapter(req, res).handle(getBooksController);
});

//Atualiza as informações de um livro na base de dados
bookRoutes.patch("/:id", async (req, res) => {
  await new RouterAdapter(req, res).handle(updateBookController);
});

//Remove as informações de um livro na base de dados
bookRoutes.delete("/:id", async (req, res) => {
  await new RouterAdapter(req, res).handle(deleteBookController);
});

export default bookRoutes;
