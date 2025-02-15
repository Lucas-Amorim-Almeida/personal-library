import { Router } from "express";
import RouterAdapter from "../adapters/RouterAdapter";
import CreateBookFactory from "../factories/BookFactory/CreateBookFactory";

const bookRoutes = Router();
const createBookController = new CreateBookFactory().getController();
//Este é um módulo que contém as rotas para Book. Logo, id se refere ao id do livro.

//Salvar informações de um novo livro
bookRoutes.post("/", async (req, res) => {
  await new RouterAdapter(req, res).handle(createBookController);
});

export default bookRoutes;
