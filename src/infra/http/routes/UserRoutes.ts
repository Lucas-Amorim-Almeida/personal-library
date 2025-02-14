import { Router } from "express";
import CreateUserFactory from "../factories/UserFactory/CreateUserFactory";
import RouterAdapter from "../adapters/RouterAdapter";
import LoginFactory from "../factories/UserFactory/LoginFactory";
import ChangePasswordFactory from "../factories/UserFactory/ChangePasswordFactory";
import ContactUpdateFactory from "../factories/UserFactory/ContactUpdateFactory";
import PersonalDataUpdateFactory from "../factories/UserFactory/PersonalDataUpdateFactory";
import UserStatusUpdateFactory from "../factories/UserFactory/UserStatusUpdateFactory";
import RemoveUserFactory from "../factories/UserFactory/RemoveUserFactory";

const userRoutes = Router();
const createUserController = new CreateUserFactory().getController();
const loginController = new LoginFactory().getController();
const changePasswordController = new ChangePasswordFactory().getController();
const contactUpdateController = new ContactUpdateFactory().getController();
const personalDataUpdateController =
  new PersonalDataUpdateFactory().getController();
const userStatusUpdateController =
  new UserStatusUpdateFactory().getController();
const removeUserController = new RemoveUserFactory().getController();

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

//Alteração das informações perssoais do usuário
userRoutes.patch("/personal_data/:id", async (req, res) => {
  await new RouterAdapter(req, res).handle(personalDataUpdateController);
});

//Alteração do status de usuário: se está banido, ativo ou na "fila" de deleção
userRoutes.patch("/status/:id", async (req, res) => {
  await new RouterAdapter(req, res).handle(userStatusUpdateController);
});

//"Remove" informações de um usuário no banco de dados
userRoutes.patch("/delete/:id", async (req, res) => {
  await new RouterAdapter(req, res).handle(removeUserController);
});

export default userRoutes;
