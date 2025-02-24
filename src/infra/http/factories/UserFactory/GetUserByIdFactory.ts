import GetUserByID from "@/domain/application/User/GetUserByID/GetUserByID";
import GetUserByIdController from "@/infra/adapters/controllers/UserControllers/GetUserByIdController";
import Controller from "@/infra/adapters/interfaces/Controller";
import UserCompletePresenter from "@/infra/adapters/presenters/UserPresenters/UserCompletePresenter";
import UserRepository from "@/infra/Database/Repositories/UserRepository";

export default class GetUserByIdFactory {
  private controller: Controller;
  constructor() {
    const repository = new UserRepository();
    const useCase = new GetUserByID(repository);
    const presenter = new UserCompletePresenter();
    this.controller = new GetUserByIdController(presenter, useCase);
  }

  getController(): Controller {
    return this.controller;
  }
}
