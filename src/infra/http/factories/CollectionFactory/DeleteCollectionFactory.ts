import DeleteCollection from "@/domain/application/Collection/DeleteCollection/DeleteCollection";
import DeleteCollectionController from "@/infra/adapters/controllers/CollectionController/DeleteCollectionController";
import Controller from "@/infra/adapters/interfaces/Controller";
import CollectionRepository from "@/infra/Database/Repositories/CollectionRepository";

export default class DeleteCollectionFactory {
  private controller: Controller;
  constructor() {
    const collectionRepository = new CollectionRepository();
    const useCase = new DeleteCollection(collectionRepository);
    this.controller = new DeleteCollectionController(useCase);
  }

  getController(): Controller {
    return this.controller;
  }
}
