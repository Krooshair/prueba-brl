import { Router } from "express";
import SaleController from "./sale.controller";
import multer from "multer";
import validateSchema from "../../shared/middlewares/validateSchema";
import { createSale, updateStatusSale } from "./sale.schema";
import validateToken from "../../shared/middlewares/validateToken";
import { getSecretKey } from "../../shared/security/getSecretKey";
import validateSchemaSale from "../../shared/middlewares/validateSchemaSale";

const SaleRoute = Router()
const sale = new SaleController()
const upload = multer();

SaleRoute.get ('/sale',            validateToken(getSecretKey),                                                                                            (req, res) => sale.listSale        (req, res))
SaleRoute.get ('/sale/:id',        validateToken(getSecretKey),                                                                                            (req, res) => sale.searchSaleById  (req, res))
SaleRoute.get ('/sale/code/:code', validateToken(getSecretKey),                                                                                            (req, res) => sale.searchSaleByCode(req, res))
SaleRoute.post('/sale',            validateToken(getSecretKey),       upload.fields([
                                                                                    { name: 'guide', maxCount: 1 },                                   
                                                                                    { name: 'bill', maxCount: 1 }                                     
                                                                                  ]),                               validateSchemaSale(createSale),       (req, res) => sale.createSale       (req, res))
SaleRoute.put ('/sale/:id',        validateToken(getSecretKey),                                                     validateSchema    (updateStatusSale), (req, res) => sale.modifyStatusSale (req, res))

export default SaleRoute