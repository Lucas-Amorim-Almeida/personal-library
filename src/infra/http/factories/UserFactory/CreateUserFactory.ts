import CreateUser from "@/domain/application/User/CreateUser/CreateUser";
import CreateUserController from "@/infra/adapters/controllers/UserControllers/CreateUserController";
import Controller from "@/infra/adapters/interfaces/Controller";
import CreateUserPresenter from "@/infra/adapters/presenters/UserPresenters/CreateUserPresenter";
import UserRepository from "@/infra/Database/Repositories/UserRepository";
import Bcrypt from "@/utils/Bcrypt";
import CreateUserRouteAdapter from "../../adapters/UserRoutesAdapters/CreateUserRouteAdapter";
import { Request, Response } from "express";

export default class CreateUserFactory {
  private controller: Controller;
  constructor() {
    const repository = new UserRepository();
    const encriper = new Bcrypt("");
    const presenter = new CreateUserPresenter();
    const useCase = new CreateUser(repository, encriper);
    this.controller = new CreateUserController(presenter, useCase);
  }

  async handle(req: Request, res: Response) {
    const routeAdapter = new CreateUserRouteAdapter(req, res);
    return routeAdapter.handle(this.controller);
  }
}
