import "dotenv/config";
import * as express from "express";
import * as http from "http";
import Database from "./infra/Repository/config/Database";

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

  configRoutes(): void {}

  async shutdown(
    server: http.Server<
      typeof http.IncomingMessage,
      typeof http.ServerResponse
    >,
  ): Promise<void> {
    console.log("Shutting down server...");
    await this.dbConnection.disconnect(); // Garante que a conexão seja fechada corretamente
    server.close((error) => {
      console.log("Server closing Error:", error);
      process.exit(1); // Encerra o processo com erro
    });
    console.log("Server disconnected.");
  }

  start(): void {
    this.configMiddleware();
    this.configRoutes();

    this.dbConnection.connect();

    const server = http.createServer(this.app);
    server.listen(this.port);
    server.on("listening", () => console.log(`Server is linstening...`));
    // Captura eventos para desligamento seguro
    process.on("SIGINT", this.shutdown.bind(this, server)); // Ctrl + C
    process.on("SIGTERM", this.shutdown.bind(this, server)); // Encerramento pelo sistema (ex: Docker, PM2)

    server.on("close", this.shutdown.bind(this, server));
  }
}
