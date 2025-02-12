import ContactUpdate from "@/domain/application/User/ContactUpdate/ContactUpdate";
import ContactUpdateController from "@/infra/adapters/controllers/UserControllers/ContactUpdateController";
import Controller from "@/infra/adapters/interfaces/Controller";
import UserRepository from "@/infra/Database/Repositories/UserRepository";

export default class ContactUpdateFactory {
  private controller: Controller;
  constructor() {
    const repository = new UserRepository();
    const useCase = new ContactUpdate(repository);
    this.controller = new ContactUpdateController(useCase);
  }

  getController(): Controller {
    return this.controller;
  }
}
