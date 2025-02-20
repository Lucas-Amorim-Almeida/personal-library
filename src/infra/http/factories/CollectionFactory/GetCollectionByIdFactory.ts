import GetCollectionByID from "@/domain/application/Collection/GetCollectionByID/GetCollectionByID";
import GetCollectionByIdController from "@/infra/adapters/controllers/CollectionController/GetCollectionByIdController";
import Controller from "@/infra/adapters/interfaces/Controller";
import CollectionPresenter from "@/infra/adapters/presenters/CollectionPresenters/CollectionPresenter";
import CollectionRepository from "@/infra/Database/Repositories/CollectionRepository";

export default class GetCollectionByIDFactory {
  private controller: Controller;
  constructor() {
    const collectionRepository = new CollectionRepository();
    const useCase = new GetCollectionByID(collectionRepository);
    const presenter = new CollectionPresenter();
    this.controller = new GetCollectionByIdController(presenter, useCase);
  }

  getController(): Controller {
    return this.controller;
  }
}
