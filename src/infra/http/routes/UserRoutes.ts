import { Router } from "express";
import CreateUserFactory from "../factories/UserFactory/CreateUserFactory";
import RouterAdapter from "../adapters/RouterAdapter";
import LoginFactory from "../factories/UserFactory/LoginFactory";

const userRoutes = Router();
const createUserController = new CreateUserFactory().getController();
const loginController = new LoginFactory().getController();

userRoutes.post("/", async (req, res) => {
  await new RouterAdapter(req, res).handle(createUserController);
});

userRoutes.post("/login", async (req, res) => {
  await new RouterAdapter(req, res).handle(loginController);
});

export default userRoutes;
