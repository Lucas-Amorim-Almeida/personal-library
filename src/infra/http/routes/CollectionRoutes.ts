import { Router } from "express";
import RouterAdapter from "../adapters/RouterAdapter";
import CreateCollectionFactory from "../factories/CollectionFactory/CreateCollectionFactory";
import GetCollectionByIDFactory from "../factories/CollectionFactory/GetCollectionByIdFactory";

const collectionRoutes = Router();

const createCollectionController =
  new CreateCollectionFactory().getController();
const getCollectionByIdController =
  new GetCollectionByIDFactory().getController();

//Este é um módulo que contém as rotas para Collectio. Logo, id se refere ao id da coleção de livros.

//Salvar informações de uma nova coleção
collectionRoutes.post("/", async (req, res) => {
  await new RouterAdapter(req, res).handle(createCollectionController);
});

//Obtém as informações de uma coleção
collectionRoutes.get("/:id", async (req, res) => {
  await new RouterAdapter(req, res).handle(getCollectionByIdController);
});

export default collectionRoutes;
