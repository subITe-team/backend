import config from "./config/config";
import express, { Application, Request, Response, NextFunction } from "express";
import routes from "./routes";
import handleErrorMiddleware from "./middlewares/error_handler2";
import morgan from "morgan";
import cors from "cors";
import sequelize from "./config/database";
import dataGenerate from "./utils/dataGenerate/dataGenerate";
import ClientError from "./utils/errors/error";

class Server {
  private readonly app: Application;
  private readonly port: string;

  constructor() {
    this.app = express();
    this.app
      .disable("x-powered-by")
      .use(morgan("dev"))
      .use(express.urlencoded({ extended: true }))
      .use(express.json())
      .use(cors());
    this.port = config.PORT;
    this.setupRoutes();
  }

  async start(): Promise<void> {
    try {
      // Sincronizar modelos con la base de datos antes de iniciar el servidor
      const syncOptions =
        config.NODE_ENV === "developer" ? { force: true } : { alter: true };
      await sequelize.sync(syncOptions);

      //Crea datos de prueba
      await dataGenerate();

      console.log("Database synchronized successfully!");

      this.app.listen(this.port, () => {
        console.log(`🚀 Server running on port ${this.port}`);
      });
    } catch (error) {
      console.error("Error synchronizing database:", error);
    }
  }

  private setupRoutes(): void {
    this.app.use("/api", routes);

    // Middleware para manejar rutas no encontradas
    this.app.use("*", (_req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({
        error: true,
        message: "Route not found",
      });
      next();
    });

    // Middleware para manejar errores
    this.app.use(handleErrorMiddleware);
  }
}

const server = new Server();
server.start().catch((error: Error): void => {
  console.log(error.message);
  throw new ClientError("Error: Server Offline", 400);
});
