import { Router } from "express";
import CreateUserFactory from "../factories/UserFactory/CreateUserFactory";

const userRoutes = Router();

userRoutes.post("/", function (req, res) {
  new CreateUserFactory().handle(req, res);
});

export default userRoutes;
