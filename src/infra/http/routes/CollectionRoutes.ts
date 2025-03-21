import { Router } from "express";
import RouterAdapter from "../adapters/RouterAdapter";
import CreateCollectionFactory from "../factories/CollectionFactory/CreateCollectionFactory";
import GetCollectionByIDFactory from "../factories/CollectionFactory/GetCollectionByIdFactory";
import GetCollectionOfUserFactory from "../factories/CollectionFactory/GetCollectionOfUserFactory";
import UpdateCollectionInfoFactory from "../factories/CollectionFactory/UpdateCollectionInfoFactory";
import UpdateBookInCollectionFactory from "../factories/CollectionFactory/UpdateBookInCollectionFactory";
import DeleteCollectionFactory from "../factories/CollectionFactory/DeleteCollectionFactory";
import { authentication } from "../middlewares/authentication.middleware";
import collectionAuthentication from "../middlewares/collectionAuthentication.middleware";
import defineVisibilityCollectionCatched from "../middlewares/defineVibilityCollectionCatched.middleware";
import createCollectionAuthentication from "../middlewares/createCollectionAuthentication.middleware";

const collectionRoutes = Router();

const createCollectionController =
  new CreateCollectionFactory().getController();
const getCollectionByIdController =
  new GetCollectionByIDFactory().getController();
const getCollectionOfUserController =
  new GetCollectionOfUserFactory().getController();
const updateCollectionInfoFactory =
  new UpdateCollectionInfoFactory().getController();
const updateBookInCollectionFactory =
  new UpdateBookInCollectionFactory().getController();
const deleteCollectionFactory = new DeleteCollectionFactory().getController();

//Este é um módulo que contém as rotas para Collectio. Logo, id se refere ao id da coleção de livros.

//Salvar informações de uma nova coleção
collectionRoutes.post("/", createCollectionAuthentication, async (req, res) => {
  await new RouterAdapter(req, res).handle(createCollectionController);
});

//Obtém as informações de uma coleção
collectionRoutes.get(
  "/:id",
  defineVisibilityCollectionCatched,
  async (req, res) => {
    await new RouterAdapter(req, res).handle(getCollectionByIdController);
  },
);

//Obtém todas as coleções de um usuário
collectionRoutes.get(
  "/user/:user_id",
  defineVisibilityCollectionCatched,
  async (req, res) => {
    await new RouterAdapter(req, res).handle(getCollectionOfUserController);
  },
);

//Atualiza as informações de uma coleção
collectionRoutes.patch("/update/info/:id", authentication, async (req, res) => {
  await new RouterAdapter(req, res).handle(updateCollectionInfoFactory);
});

//Atualiza as informações dos livros em uma coleção
collectionRoutes.patch("/update/book/:id", authentication, async (req, res) => {
  await new RouterAdapter(req, res).handle(updateBookInCollectionFactory);
});

//Deleta as informações de uma coleção da base de dados
collectionRoutes.delete("/:id", collectionAuthentication, async (req, res) => {
  await new RouterAdapter(req, res).handle(deleteCollectionFactory);
});

export default collectionRoutes;
