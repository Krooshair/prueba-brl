import { Router } from "express";
import SupplierController from "./supplier.controller";
import validateSchema from "../../shared/middlewares/validateSchema";
import { createSupplier, updateSupplier } from "./supplier.schema";
import validateToken from "../../shared/middlewares/validateToken";
import { getSecretKey } from "../../shared/security/getSecretKey";

const SupplierRoute = Router()
const supplier = new SupplierController()

SupplierRoute.get   ('/supplier',     validateToken(getSecretKey),                                 (req, res) => supplier.listSupplier      (req, res))
SupplierRoute.get   ('/supplier/:id', validateToken(getSecretKey),                                 (req, res) => supplier.searchSupplierById(req, res))
SupplierRoute.post  ('/supplier',     validateToken(getSecretKey), validateSchema(createSupplier), (req, res) => supplier.createSupplier    (req, res))
SupplierRoute.put   ('/supplier/:id', validateToken(getSecretKey), validateSchema(updateSupplier), (req, res) => supplier.updateSupplier    (req, res))
SupplierRoute.delete('/supplier/:id', validateToken(getSecretKey),                                 (req, res) => supplier.trashSupplier     (req, res))

export default SupplierRoute