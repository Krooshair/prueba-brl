"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (getUserSecretKey) => async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res
            .status(401)
            .json({ message: "No enviaste la cabecera 'Authorization'" });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Formato de token inválido' });
    }
    try {
        const decoded = jsonwebtoken_1.default.decode(token);
        const userId = decoded && typeof decoded != 'string' && decoded.id;
        const secretKey = await getUserSecretKey(userId);
        if (!secretKey)
            return res
                .status(401)
                .json({ message: 'El administrador tiene una clave de acceso' });
        jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.log(err);
                return res
                    .status(401)
                    .json({ message: 'No tienes permisos para realizar esta acción' });
            }
            req.body = { ...req.body, decoded };
            next();
        });
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};
exports.default = validateToken;
