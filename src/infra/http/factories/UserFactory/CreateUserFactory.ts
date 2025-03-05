import CreateUser from "@/domain/application/User/CreateUser/CreateUser";
import CreateUserController from "@/infra/adapters/controllers/UserControllers/CreateUserController";
import Controller from "@/infra/adapters/interfaces/Controller";
import UserRepository from "@/infra/Database/Repositories/UserRepository";
import Bcrypt from "@/utils/Bcrypt";

export default class CreateUserFactory {
  private controller: Controller;
  constructor() {
    const repository = new UserRepository();
    const encriper = new Bcrypt("");
    const useCase = new CreateUser(repository, encriper);
    this.controller = new CreateUserController(useCase);
  }

  getController(): Controller {
    return this.controller;
  }
}
