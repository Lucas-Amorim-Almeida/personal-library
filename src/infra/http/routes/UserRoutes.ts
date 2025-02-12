import { Router } from "express";
import CreateUserFactory from "../factories/UserFactory/CreateUserFactory";
import RouterAdapter from "../adapters/RouterAdapter";
import LoginFactory from "../factories/UserFactory/LoginFactory";
import ChangePasswordFactory from "../factories/UserFactory/ChangePasswordFactory";
import ContactUpdateFactory from "../factories/UserFactory/ContactUpdateFactory";

const userRoutes = Router();
const createUserController = new CreateUserFactory().getController();
const loginController = new LoginFactory().getController();
const changePasswordController = new ChangePasswordFactory().getController();
const contactUpdateController = new ContactUpdateFactory().getController();

//Este é um módulo que contém as rotas para user. Logo, id se refere ao id do usuário

//Salvar informações de um novo usuário
userRoutes.post("/", async (req, res) => {
  await new RouterAdapter(req, res).handle(createUserController);
});

//Login de usuário
userRoutes.post("/login", async (req, res) => {
  await new RouterAdapter(req, res).handle(loginController);
});

//Alteração de senha do usuário
userRoutes.patch("/password/:id", async (req, res) => {
  await new RouterAdapter(req, res).handle(changePasswordController);
});

//Alteração das informações de contato do usuário
userRoutes.patch("/contact/:id", async (req, res) => {
  await new RouterAdapter(req, res).handle(contactUpdateController);
});

export default userRoutes;
