import { Router } from "express";
import AdminController from "./admin.controller";
import { authAdmin, createAdmin, createFirstAdmin, modifyPasswordAdmin, restorePassword, sendEmail, updateAdmin } from "./admin.schema";
import validateSchema from "../../shared/middlewares/validateSchema";
import validateToken from "../../shared/middlewares/validateToken";
import { getSecretKey } from "../../shared/security/getSecretKey";

const AdminRoute = Router()
const admin = new AdminController()

AdminRoute.get   ('/admin',                 validateToken(getSecretKey),                                      (req, res) => admin.listAdmin                  (req, res))
AdminRoute.get   ('/admin/id/:id',          validateToken(getSecretKey),                                      (req, res) => admin.searchAdminById            (req, res))
AdminRoute.get   ('/admin/profile',         validateToken(getSecretKey),                                      (req, res) => admin.profileAdmin               (req, res))
AdminRoute.get   ('/admin/verify',          validateToken(getSecretKey),                                      (req, res) => admin.verifyAccount              (req, res))
AdminRoute.get   ('/admin/send/verify/:id',                                                                   (req, res) => admin.sendEmailForVerifyAccount  (req, res))
AdminRoute.post  ('/admin',                 validateToken(getSecretKey), validateSchema(createAdmin),         (req, res) => admin.createAdmin                (req, res))
AdminRoute.post  ('/admin/first',                                        validateSchema(createFirstAdmin),    (req, res) => admin.createFirstAdmin           (req, res))
AdminRoute.post  ('/admin/auth',                                         validateSchema(authAdmin),           (req, res) => admin.authAdmin                  (req, res))
AdminRoute.post  ('/admin/send/restore',                                 validateSchema(sendEmail),           (req, res) => admin.sendEmailForRestorePassword(req, res))
AdminRoute.put   ('/admin/restore',         validateToken(getSecretKey), validateSchema(restorePassword),     (req, res) => admin.restorePassword            (req, res))
AdminRoute.put   ('/admin/:id',             validateToken(getSecretKey), validateSchema(updateAdmin),         (req, res) => admin.updateAdmin                (req, res))
AdminRoute.put   ('/admin/status/:id',      validateToken(getSecretKey),                                      (req, res) => admin.modifyStatusAdmin          (req, res))
AdminRoute.put   ('/admin/change/password', validateToken(getSecretKey), validateSchema(modifyPasswordAdmin), (req, res) => admin.modifyPasswordAdmin        (req, res))
AdminRoute.delete('/admin/:id',             validateToken(getSecretKey),                                      (req, res) => admin.trashAdmin                 (req, res))

export default AdminRoute