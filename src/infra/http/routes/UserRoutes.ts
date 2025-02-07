import { Router } from "express";
import CreateUserFactory from "../factories/UserFactory/CreateUserFactory";
import CreateUserRouteAdapter from "../adapters/UserRoutesAdapters/CreateUserRouteAdapter";

const userRoutes = Router();

const controller = new CreateUserFactory().getController();
userRoutes.post("/", async (req, res) => {
  await new CreateUserRouteAdapter(req, res).handle(controller);
});
userRoutes.get("/route", async function () {
  throw new Error("Teste de erro");
});

export default userRoutes;
