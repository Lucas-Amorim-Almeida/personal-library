import UserStatusUpdate from "@/domain/application/User/UserStatusUpdate/UserStatusUpdate";
import UserStatusUpdateController from "@/infra/adapters/controllers/UserControllers/UserStatusUpdateController";
import Controller from "@/infra/adapters/interfaces/Controller";
import UserRepository from "@/infra/Database/Repositories/UserRepository";

export default class UserStatusUpdateFactory {
  private controller: Controller;
  constructor() {
    const repository = new UserRepository();
    const useCase = new UserStatusUpdate(repository);
    this.controller = new UserStatusUpdateController(useCase);
  }

  getController(): Controller {
    return this.controller;
  }
}
