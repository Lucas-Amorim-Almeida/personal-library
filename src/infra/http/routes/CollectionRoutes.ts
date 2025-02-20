import { Router } from "express";
import RouterAdapter from "../adapters/RouterAdapter";
import CreateCollectionFactory from "../factories/CollectionFactory/CreateCollectionFactory";

const collectionRoutes = Router();

const createCollectionController =
  new CreateCollectionFactory().getController();

//Este é um módulo que contém as rotas para Book. Logo, id se refere ao id do livro.

//Salvar informações de um novo livro
collectionRoutes.post("/", async (req, res) => {
  await new RouterAdapter(req, res).handle(createCollectionController);
});

export default collectionRoutes;
