import Controller from "@/infra/adapters/interfaces/Controller";
import BookRepository from "@/infra/Database/Repositories/BookRepository";
import DeleteBook from "@/domain/application/Book/DeleteBook/DeleteBook";
import DeleteBookController from "@/infra/adapters/controllers/BookControllers/DeleteBookController";

export default class DeleteBookFactory {
  private controller: Controller;
  constructor() {
    const repository = new BookRepository();
    const useCase = new DeleteBook(repository);
    this.controller = new DeleteBookController(useCase);
  }

  getController(): Controller {
    return this.controller;
  }
}
