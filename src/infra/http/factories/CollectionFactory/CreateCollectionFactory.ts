import CreateCollection from "@/domain/application/Collection/CreteCollection/CreateCollection";
import CreateCollectionController from "@/infra/adapters/controllers/CollectionController/CreateCollectionController";
import Controller from "@/infra/adapters/interfaces/Controller";
import CollectionPresenter from "@/infra/adapters/presenters/CollectionPresenters/CollectionPresenter";
import BookRepository from "@/infra/Database/Repositories/BookRepository";
import CollectionRepository from "@/infra/Database/Repositories/CollectionRepository";
import UserRepository from "@/infra/Database/Repositories/UserRepository";

export default class CreateCollectionFactory {
  private controller: Controller;
  constructor() {
    const collectionRepository = new CollectionRepository();
    const bookRepository = new BookRepository();
    const userRepository = new UserRepository();
    const useCase = new CreateCollection(
      userRepository,
      bookRepository,
      collectionRepository,
    );
    const presenter = new CollectionPresenter();
    this.controller = new CreateCollectionController(presenter, useCase);
  }

  getController(): Controller {
    return this.controller;
  }
}
