import GetBooks from "@/domain/application/Book/GetBooks/GetBooks";
import GetBooksController from "@/infra/adapters/controllers/BookControllers/GetBooksController";
import Controller from "@/infra/adapters/interfaces/Controller";
import SimpleInfoBookPresenter from "@/infra/adapters/presenters/BookPresenters/SimpleInfoBookPresenter";
import BookRepository from "@/infra/Database/Repositories/BookRepository";

export default class GetBooksFactory {
  private controller: Controller;
  constructor() {
    const repository = new BookRepository();
    const useCase = new GetBooks(repository);
    const presenter = new SimpleInfoBookPresenter();
    this.controller = new GetBooksController(presenter, useCase);
  }

  getController(): Controller {
    return this.controller;
  }
}
