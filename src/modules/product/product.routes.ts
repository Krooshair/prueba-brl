import { Router } from "express";
import ProductController from "./product.controller";
import multer from 'multer'
import validateToken from "../../shared/middlewares/validateToken";
import { getSecretKey } from "../../shared/security/getSecretKey";
import validateSchema from "../../shared/middlewares/validateSchema";
import validateSchemaProduct from "../../shared/middlewares/form-data/validateSchemaProduct";
import { createProduct, updateProduct } from "./product.schema";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const ProductRoute = Router()
const product = new ProductController()

ProductRoute.get   ('/product',                                                                                                              (req, res) => product.listProduct               (req, res))
ProductRoute.get   ('/product/:id',               validateToken(getSecretKey),                                                               (req, res) => product.searchProductById         (req, res))
ProductRoute.get   ('/product/slug/:slug',                                                                                                   (req, res) => product.searchProductBySlug       (req, res))
ProductRoute.post  ('/product',                   validateToken(getSecretKey), upload.single('image'), validateSchemaProduct(createProduct), (req, res) => product.createProduct             (req, res))
ProductRoute.post  ('/product/image/:id',         validateToken(getSecretKey), upload.single('image'),                                       (req, res) => product.addImageProduct           (req, res))
ProductRoute.put   ('/product/:id',               validateToken(getSecretKey),                         validateSchema(updateProduct),        (req, res) => product.updateProduct             (req, res))
ProductRoute.patch ('/product/thumbnail/:id',     validateToken(getSecretKey), upload.single('image'),                                       (req, res) => product.updateThumbnail           (req, res))
ProductRoute.delete('/product/:id',               validateToken(getSecretKey),                                                               (req, res) => product.trashProduct              (req, res))
ProductRoute.delete('/product/image/:imageId',    validateToken(getSecretKey),                                                               (req, res) => product.trashImageProduct         (req, res))

export default ProductRoute