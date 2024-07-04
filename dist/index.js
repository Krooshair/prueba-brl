"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
//RUTAS
const v1Routes_1 = __importDefault(require("./shared/routes/v1Routes"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
//APP USE
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
//ROUTES
app.use('/api/v1', v1Routes_1.default);
//SERVER LISTEN
app.listen(port, () => {
    console.log(`Server in running http://${host}:${port}`);
});
