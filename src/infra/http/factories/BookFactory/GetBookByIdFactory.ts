import GetBookById from "@/domain/application/Book/GetBookByID/GetBookById";
import GetBookByIdController from "@/infra/adapters/controllers/BookControllers/GetBookByIdController";
import Controller from "@/infra/adapters/interfaces/Controller";
import BookPresenter from "@/infra/adapters/presenters/BookPresenters/BookPresenter";
import BookRepository from "@/infra/Database/Repositories/BookRepository";

export default class GetBookByIdFactory {
  private controller: Controller;
  constructor() {
    const repository = new BookRepository();
    const useCase = new GetBookById(repository);
    const presenter = new BookPresenter();
    this.controller = new GetBookByIdController(presenter, useCase);
  }

  getController(): Controller {
    return this.controller;
  }
}
