import UpdateBookInCollection from "@/domain/application/Collection/UpdateBookInCollection/UpdateBookInCollection";
import UpdateBookInCollectionController from "@/infra/adapters/controllers/CollectionController/UpdateBookInCollectionController";
import Controller from "@/infra/adapters/interfaces/Controller";
import BookRepository from "@/infra/Database/Repositories/BookRepository";
import CollectionRepository from "@/infra/Database/Repositories/CollectionRepository";

export default class UpdateBookInCollectionFactory {
  private controller: Controller;
  constructor() {
    const collectionRepository = new CollectionRepository();
    const bookRepository = new BookRepository();
    const useCase = new UpdateBookInCollection(
      collectionRepository,
      bookRepository,
    );
    this.controller = new UpdateBookInCollectionController(useCase);
  }

  getController(): Controller {
    return this.controller;
  }
}
