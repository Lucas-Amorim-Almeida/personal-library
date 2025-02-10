import Login from "@/domain/application/User/Login/Login";
import LoginController from "@/infra/adapters/controllers/UserControllers/LoginController";
import Controller from "@/infra/adapters/interfaces/Controller";
import UserPresenter from "@/infra/adapters/presenters/UserPresenters/UserPresenter";
import UserRepository from "@/infra/Database/Repositories/UserRepository";
import Bcrypt from "@/utils/Bcrypt";

export default class LoginFactory {
  private controller: Controller;
  constructor() {
    const repository = new UserRepository();
    const encriper = new Bcrypt("");
    const useCase = new Login(repository, encriper);
    const presenter = new UserPresenter();
    this.controller = new LoginController(presenter, useCase);
  }

  getController(): Controller {
    return this.controller;
  }
}
