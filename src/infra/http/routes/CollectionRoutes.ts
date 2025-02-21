import { Router } from "express";
import RouterAdapter from "../adapters/RouterAdapter";
import CreateCollectionFactory from "../factories/CollectionFactory/CreateCollectionFactory";
import GetCollectionByIDFactory from "../factories/CollectionFactory/GetCollectionByIdFactory";
import GetCollectionOfUserFactory from "../factories/CollectionFactory/GetCollectionOfUserFactory";
import UpdateCollectionInfoFactory from "../factories/CollectionFactory/UpdateCollectionInfoFactory";

const collectionRoutes = Router();

const createCollectionController =
  new CreateCollectionFactory().getController();
const getCollectionByIdController =
  new GetCollectionByIDFactory().getController();
const getCollectionOfUserController =
  new GetCollectionOfUserFactory().getController();
const updateCollectionInfoFactory =
  new UpdateCollectionInfoFactory().getController();

//Este é um módulo que contém as rotas para Collectio. Logo, id se refere ao id da coleção de livros.

//Salvar informações de uma nova coleção
collectionRoutes.post("/", async (req, res) => {
  await new RouterAdapter(req, res).handle(createCollectionController);
});

//Obtém as informações de uma coleção
collectionRoutes.get("/:id", async (req, res) => {
  await new RouterAdapter(req, res).handle(getCollectionByIdController);
});

//Obtém todas as coleções de um usuário
collectionRoutes.get("/user/:user_id", async (req, res) => {
  await new RouterAdapter(req, res).handle(getCollectionOfUserController);
});

//Atualiza as informações de uma coleção
collectionRoutes.patch("/update/info/:id", async (req, res) => {
  await new RouterAdapter(req, res).handle(updateCollectionInfoFactory);
});

export default collectionRoutes;
