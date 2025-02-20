import GetCollectionOfUser from "@/domain/application/Collection/GetCollectionOfUser/GetCollectionOfUser";
import GetCollectionOfUserController from "@/infra/adapters/controllers/CollectionController/GetCollectionOfUserController";
import Controller from "@/infra/adapters/interfaces/Controller";
import CollectionPresenterSimplified from "@/infra/adapters/presenters/CollectionPresenters/CollectionPresenterSimplified";
import CollectionRepository from "@/infra/Database/Repositories/CollectionRepository";

export default class GetCollectionOfUserFactory {
  private controller: Controller;
  constructor() {
    const collectionRepository = new CollectionRepository();
    const useCase = new GetCollectionOfUser(collectionRepository);
    const presenter = new CollectionPresenterSimplified();
    this.controller = new GetCollectionOfUserController(presenter, useCase);
  }

  getController(): Controller {
    return this.controller;
  }
}
