"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sale_controller_1 = __importDefault(require("./sale.controller"));
const multer_1 = __importDefault(require("multer"));
const validateSchema_1 = __importDefault(require("../../shared/middlewares/validateSchema"));
const sale_schema_1 = require("./sale.schema");
const validateToken_1 = __importDefault(require("../../shared/middlewares/validateToken"));
const getSecretKey_1 = require("../../shared/security/getSecretKey");
const validateSchemaSale_1 = __importDefault(require("../../shared/middlewares/validateSchemaSale"));
const SaleRoute = (0, express_1.Router)();
const sale = new sale_controller_1.default();
const upload = (0, multer_1.default)();
SaleRoute.get('/sale', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (req, res) => sale.listSale(req, res));
SaleRoute.get('/sale/:id', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (req, res) => sale.searchSaleById(req, res));
SaleRoute.get('/sale/code/:code', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (req, res) => sale.searchSaleByCode(req, res));
SaleRoute.post('/sale', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), upload.fields([
    { name: 'guide', maxCount: 1 },
    { name: 'bill', maxCount: 1 }
]), (0, validateSchemaSale_1.default)(sale_schema_1.createSale), (req, res) => sale.createSale(req, res));
SaleRoute.put('/sale/:id', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (0, validateSchema_1.default)(sale_schema_1.updateStatusSale), (req, res) => sale.modifyStatusSale(req, res));
exports.default = SaleRoute;
