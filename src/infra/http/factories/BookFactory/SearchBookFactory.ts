import SearchBook from "@/domain/application/Book/SearchBook/SearchBook";
import SearchBookController from "@/infra/adapters/controllers/BookControllers/SearchBookController";
import Controller from "@/infra/adapters/interfaces/Controller";
import SimpleInfoBookPresenter from "@/infra/adapters/presenters/BookPresenters/SimpleInfoBookPresenter";
import BookRepository from "@/infra/Database/Repositories/BookRepository";

export default class SearchBookFactory {
  private controller: Controller;
  constructor() {
    const repository = new BookRepository();
    const useCase = new SearchBook(repository);
    const presenter = new SimpleInfoBookPresenter();
    this.controller = new SearchBookController(presenter, useCase);
  }

  getController(): Controller {
    return this.controller;
  }
}
