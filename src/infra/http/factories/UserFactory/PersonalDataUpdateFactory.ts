import PersonalDataUpdate from "@/domain/application/User/PersonalDataUpdate/PersonalDataUpdate";
import PersonalDataUpdateController from "@/infra/adapters/controllers/UserControllers/PersonalDataUpdateController";
import Controller from "@/infra/adapters/interfaces/Controller";
import UserRepository from "@/infra/Database/Repositories/UserRepository";

export default class PersonalDataUpdateFactory {
  private controller: Controller;
  constructor() {
    const repository = new UserRepository();
    const useCase = new PersonalDataUpdate(repository);
    this.controller = new PersonalDataUpdateController(useCase);
  }

  getController(): Controller {
    return this.controller;
  }
}
