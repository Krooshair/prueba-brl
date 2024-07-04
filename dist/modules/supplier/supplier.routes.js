"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supplier_controller_1 = __importDefault(require("./supplier.controller"));
const validateSchema_1 = __importDefault(require("../../shared/middlewares/validateSchema"));
const supplier_schema_1 = require("./supplier.schema");
const validateToken_1 = __importDefault(require("../../shared/middlewares/validateToken"));
const getSecretKey_1 = require("../../shared/security/getSecretKey");
const SupplierRoute = (0, express_1.Router)();
const supplier = new supplier_controller_1.default();
SupplierRoute.get('/supplier', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (req, res) => supplier.listSupplier(req, res));
SupplierRoute.get('/supplier/:id', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (req, res) => supplier.searchSupplierById(req, res));
SupplierRoute.post('/supplier', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (0, validateSchema_1.default)(supplier_schema_1.createSupplier), (req, res) => supplier.createSupplier(req, res));
SupplierRoute.put('/supplier/:id', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (0, validateSchema_1.default)(supplier_schema_1.updateSupplier), (req, res) => supplier.updateSupplier(req, res));
SupplierRoute.delete('/supplier/:id', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (req, res) => supplier.trashSupplier(req, res));
exports.default = SupplierRoute;
