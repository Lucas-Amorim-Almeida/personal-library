import App from "./app";
import Database from "./infra/Repository/config/Database";

const app = new App(Database.getInstance());
app.start();
