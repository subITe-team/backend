"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config/config"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const error_handler2_1 = __importDefault(require("./middlewares/error_handler2"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const dataGenerate_1 = __importDefault(require("./utils/dataGenerate/dataGenerate"));
const error_1 = __importDefault(require("./utils/errors/error"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.app
            .disable("x-powered-by")
            .use((0, morgan_1.default)("dev"))
            .use(express_1.default.urlencoded({ extended: true }))
            .use(express_1.default.json())
            .use((0, cors_1.default)());
        this.port = config_1.default.PORT;
        this.setupRoutes();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Sincronizar modelos con la base de datos antes de iniciar el servidor
                const syncOptions = config_1.default.NODE_ENV === "developer" ? { force: true } : { alter: true };
                yield database_1.default.sync(syncOptions);
                //Crea datos de prueba
                yield (0, dataGenerate_1.default)();
                console.log("Database synchronized successfully!");
                this.app.listen(this.port, () => {
                    console.log(`🚀 Server running on port ${this.port}`);
                });
            }
            catch (error) {
                console.error("Error synchronizing database:", error);
            }
        });
    }
    setupRoutes() {
        this.app.use("/api", routes_1.default);
        // Middleware para manejar rutas no encontradas
        this.app.use("*", (_req, res, next) => {
            res.status(404).json({
                error: true,
                message: "Route not found",
            });
            next();
        });
        // Middleware para manejar errores
        this.app.use(error_handler2_1.default);
    }
}
const server = new Server();
server.start().catch((error) => {
    console.log(error.message);
    throw new error_1.default("Error: Server Offline", 400);
});
//# sourceMappingURL=server.js.map