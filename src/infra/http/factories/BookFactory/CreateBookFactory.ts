import CreateBook from "@/domain/application/Book/CreateBook/CreateBook";
import CreateBookController from "@/infra/adapters/controllers/BookControllers/CreateBookController";
import Controller from "@/infra/adapters/interfaces/Controller";
import BookPresenter from "@/infra/adapters/presenters/BookPresenters/BookPresenter";
import BookRepository from "@/infra/Database/Repositories/BookRepository";

export default class CreateBookFactory {
  private controller: Controller;
  constructor() {
    const repository = new BookRepository();
    const useCase = new CreateBook(repository);
    const presenter = new BookPresenter();
    this.controller = new CreateBookController(presenter, useCase);
  }

  getController(): Controller {
    return this.controller;
  }
}
