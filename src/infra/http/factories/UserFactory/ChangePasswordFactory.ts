import ChangePassword from "@/domain/application/User/ChangePassword/ChangePassword";
import ChangePasswordController from "@/infra/adapters/controllers/UserControllers/ChangePasswordController";
import Controller from "@/infra/adapters/interfaces/Controller";
import UserRepository from "@/infra/Database/Repositories/UserRepository";
import Bcrypt from "@/utils/Bcrypt";

export default class ChangePasswordFactory {
  private controller: Controller;
  constructor() {
    const repository = new UserRepository();
    const encriper = new Bcrypt("");
    const useCase = new ChangePassword(repository, encriper);
    this.controller = new ChangePasswordController(useCase);
  }

  getController(): Controller {
    return this.controller;
  }
}
