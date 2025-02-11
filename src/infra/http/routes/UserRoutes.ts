import { Router } from "express";
import CreateUserFactory from "../factories/UserFactory/CreateUserFactory";
import RouterAdapter from "../adapters/RouterAdapter";
import LoginFactory from "../factories/UserFactory/LoginFactory";
import ChangePasswordFactory from "../factories/UserFactory/ChangePasswordFactory";

const userRoutes = Router();
const createUserController = new CreateUserFactory().getController();
const loginController = new LoginFactory().getController();
const changePasswordController = new ChangePasswordFactory().getController();

userRoutes.post("/", async (req, res) => {
  await new RouterAdapter(req, res).handle(createUserController);
});

userRoutes.post("/login", async (req, res) => {
  await new RouterAdapter(req, res).handle(loginController);
});

userRoutes.patch("/password/:id", async (req, res) => {
  await new RouterAdapter(req, res).handle(changePasswordController);
});

export default userRoutes;
