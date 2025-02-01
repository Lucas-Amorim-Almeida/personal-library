import App from "./app";
import Database from "./infra/Database/config/Database";

const app = new App(Database.getInstance());
app.start();
