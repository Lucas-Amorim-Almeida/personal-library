import Controller from "@/infra/adapters/interfaces/Controller";
import BookRepository from "@/infra/Database/Repositories/BookRepository";
import UpdateBook from "@/domain/application/Book/UpdateBook/UpdateBook";
import UpdateBookController from "@/infra/adapters/controllers/BookControllers/UpdateBookController";

export default class UpdateBookFactory {
  private controller: Controller;
  constructor() {
    const repository = new BookRepository();
    const useCase = new UpdateBook(repository);
    this.controller = new UpdateBookController(useCase);
  }

  getController(): Controller {
    return this.controller;
  }
}
