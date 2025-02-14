import RemoveUser from "@/domain/application/User/RemoveUser/RemoveUser";
import RemoveUserController from "@/infra/adapters/controllers/UserControllers/RemoveUserController";
import Controller from "@/infra/adapters/interfaces/Controller";
import UserRepository from "@/infra/Database/Repositories/UserRepository";

export default class RemoveUserFactory {
  private controller: Controller;
  constructor() {
    const repository = new UserRepository();
    const useCase = new RemoveUser(repository);
    this.controller = new RemoveUserController(useCase);
  }

  getController(): Controller {
    return this.controller;
  }
}
