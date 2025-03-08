import { Router } from "express";
import RouterAdapter from "../adapters/RouterAdapter";
import CreateBookFactory from "../factories/BookFactory/CreateBookFactory";
import GetBooksFactory from "../factories/BookFactory/GetBooksFactory";
import UpdateBookFactory from "../factories/BookFactory/UpdateBookFactory";
import DeleteBookFactory from "../factories/BookFactory/DeleteBookFactory";
import GetBookByIdFactory from "../factories/BookFactory/GetBookByIdFactory";
import SearchBookFactory from "../factories/BookFactory/SearchBookFactory";
import { authentication } from "../middlewares/authentication.middleware";
import bookAuthentication from "../middlewares/bookAuthentication.middleware";
import bookCreation from "../middlewares/bookCreation.Middleware";

const bookRoutes = Router();
const createBookController = new CreateBookFactory().getController();
const getBooksController = new GetBooksFactory().getController();
const getBookByIdController = new GetBookByIdFactory().getController();
const searchBookController = new SearchBookFactory().getController();
const updateBookController = new UpdateBookFactory().getController();
const deleteBookController = new DeleteBookFactory().getController();

//Este é um módulo que contém as rotas para Book. Logo, id se refere ao id do livro.

//Salvar informações de um novo livro
bookRoutes.post("/", authentication, bookCreation, async (req, res) => {
  await new RouterAdapter(req, res).handle(createBookController);
});

//Fazer a busca informações de livros na base de dados
bookRoutes.get("/search", async (req, res) => {
  await new RouterAdapter(req, res).handle(searchBookController);
});

//Obter informações de um livro a partir de seu id na base de dados
bookRoutes.get("/:id", async (req, res) => {
  await new RouterAdapter(req, res).handle(getBookByIdController);
});

//Obter informações de varaios ou todos os livros da base de dados
bookRoutes.get("/", async (req, res) => {
  await new RouterAdapter(req, res).handle(getBooksController);
});

//Atualiza as informações de um livro na base de dados
bookRoutes.patch("/:id", bookAuthentication, async (req, res) => {
  await new RouterAdapter(req, res).handle(updateBookController);
});

//Remove as informações de um livro na base de dados
bookRoutes.delete("/:id", bookAuthentication, async (req, res) => {
  await new RouterAdapter(req, res).handle(deleteBookController);
});

export default bookRoutes;
