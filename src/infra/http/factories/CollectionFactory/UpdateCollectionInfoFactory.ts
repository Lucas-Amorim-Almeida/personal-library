import UpdateCollectionInfo from "@/domain/application/Collection/UpdateCollectionInfo/UpdateCollectionInfo";
import UpdateCollectionInfoController from "@/infra/adapters/controllers/CollectionController/UpdateCollectionInfoController";
import Controller from "@/infra/adapters/interfaces/Controller";
import CollectionRepository from "@/infra/Database/Repositories/CollectionRepository";

export default class UpdateCollectionInfoFactory {
  private controller: Controller;
  constructor() {
    const collectionRepository = new CollectionRepository();
    const useCase = new UpdateCollectionInfo(collectionRepository);
    this.controller = new UpdateCollectionInfoController(useCase);
  }

  getController(): Controller {
    return this.controller;
  }
}
