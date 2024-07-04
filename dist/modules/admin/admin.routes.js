"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = __importDefault(require("./admin.controller"));
const admin_schema_1 = require("./admin.schema");
const validateSchema_1 = __importDefault(require("../../shared/middlewares/validateSchema"));
const validateToken_1 = __importDefault(require("../../shared/middlewares/validateToken"));
const getSecretKey_1 = require("../../shared/security/getSecretKey");
const AdminRoute = (0, express_1.Router)();
const admin = new admin_controller_1.default();
AdminRoute.get('/admin', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (req, res) => admin.listAdmin(req, res));
AdminRoute.get('/admin/id/:id', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (req, res) => admin.searchAdminById(req, res));
AdminRoute.get('/admin/profile', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (req, res) => admin.profileAdmin(req, res));
AdminRoute.get('/admin/verify', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (req, res) => admin.verifyAccount(req, res));
AdminRoute.get('/admin/send/verify/:id', (req, res) => admin.sendEmailForVerifyAccount(req, res));
AdminRoute.post('/admin', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (0, validateSchema_1.default)(admin_schema_1.createAdmin), (req, res) => admin.createAdmin(req, res));
AdminRoute.post('/admin/first', (0, validateSchema_1.default)(admin_schema_1.createFirstAdmin), (req, res) => admin.createFirstAdmin(req, res));
AdminRoute.post('/admin/auth', (0, validateSchema_1.default)(admin_schema_1.authAdmin), (req, res) => admin.authAdmin(req, res));
AdminRoute.post('/admin/send/restore', (0, validateSchema_1.default)(admin_schema_1.sendEmail), (req, res) => admin.sendEmailForRestorePassword(req, res));
AdminRoute.put('/admin/restore', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (0, validateSchema_1.default)(admin_schema_1.restorePassword), (req, res) => admin.restorePassword(req, res));
AdminRoute.put('/admin/:id', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (0, validateSchema_1.default)(admin_schema_1.updateAdmin), (req, res) => admin.updateAdmin(req, res));
AdminRoute.put('/admin/status/:id', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (req, res) => admin.modifyStatusAdmin(req, res));
AdminRoute.put('/admin/change/password', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (0, validateSchema_1.default)(admin_schema_1.modifyPasswordAdmin), (req, res) => admin.modifyPasswordAdmin(req, res));
AdminRoute.delete('/admin/:id', (0, validateToken_1.default)(getSecretKey_1.getSecretKey), (req, res) => admin.trashAdmin(req, res));
exports.default = AdminRoute;
