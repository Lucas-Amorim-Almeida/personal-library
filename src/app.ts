import "express-async-errors";
import "dotenv/config";
import * as express from "express";
import * as http from "http";
import Database from "./infra/Database/config/Database";
import userRoutes from "./infra/http/routes/UserRoutes";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerDoc from "../docs/swagger.json";
import { errorsMiddleWare } from "./infra/http/middlewares/errors.middleware";

export default class App {
  private app;
  private readonly port: string;

  constructor(private dbConnection: Database) {
    this.app = express();
    this.port = process.env.PORT ?? "3000";
  }

  configMiddleware(): void {
    this.app.use(express.json());
  }

  configRoutes(): void {
    this.app.use("/user", userRoutes);

    // Configuração do Swagger
    this.app.use(
      "/api/docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDoc, {
        customSiteTitle: "Personal_Library-API: Documentação",
      }),
    );
  }

  async shutdown(
    server: http.Server<
      typeof http.IncomingMessage,
      typeof http.ServerResponse
    >,
  ): Promise<void> {
    console.log("Shutting down server...");

    //Encerramento adequado da conexão com o banco de dados
    await this.dbConnection.disconnect();

    //Encerramento do server
    server.close((error) => {
      console.log("Server closing Error:", error);
      process.exit(1); // Encerra o processo com erro
    });
    console.log("Server disconnected.");
  }

  start(): void {
    //inicialização dos middlewares
    this.configMiddleware();
    //inicialização das rotas
    this.configRoutes();
    //inicialização da conexão com o banco de dados
    this.dbConnection.connect();

    //Middleware de errors
    this.app.use(errorsMiddleWare);

    //inicialização/configuração do server
    const server = http.createServer(this.app);
    server.listen(this.port);
    server.on("listening", () => console.log(`Server is linstening...`));

    // Captura eventos para desligamento seguro
    process.on("SIGINT", this.shutdown.bind(this, server)); // Ctrl + C
    process.on("SIGTERM", this.shutdown.bind(this, server)); // Encerramento pelo sistema (ex: Docker, PM2)
    server.on("close", this.shutdown.bind(this, server));
  }
}
