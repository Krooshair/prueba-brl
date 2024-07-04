"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cloudinary_1 = require("../../shared/services/Cloudinary");
const isNumeric_1 = __importDefault(require("../../shared/utils/isNumeric"));
const product_service_1 = __importDefault(require("./product.service"));
// import axios from 'axios';
// import PDFDocument from 'pdfkit';
class ProductController extends product_service_1.default {
    /**
     * Método para listar todos los productos
     * @param _req Parametro no usado de tipo Request
     * @param res Parametro de tipo Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async listProduct(_req, res) {
        try {
            const response = await this.getProduct();
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al listar productos',
                error,
            });
        }
    }
    /**
     * Método para buscar un producto por su id
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async searchProductById(req, res) {
        try {
            const { id } = req.params;
            if (!(0, isNumeric_1.default)(Number(id)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'id' no es numérico" });
            const response = await this.getProductById(Number(id));
            if (!response)
                return res
                    .status(404)
                    .json({ message: 'El producto que intenta buscar, no existe!' });
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al buscar un producto por id',
                error,
            });
        }
    }
    /**
     * Método para buscar un producto por su slug
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async searchProductBySlug(req, res) {
        try {
            const { slug } = req.params;
            const response = await this.getProductBySlug(slug);
            if (!response)
                return res
                    .status(404)
                    .json({ message: 'El producto que intenta buscar, no existe!' });
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al buscar un producto por slug',
                error,
            });
        }
    }
    /**
     * Método para imprimir el codigo de un producto
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    // public async printCodeProduct(
    //   req: Request,
    //   res: Response
    // ): Promise<Response | void> {
    //   try {
    //     const { id } = req.params;
    //     if (!isNumeric(Number(id)))
    //       return res
    //         .status(400)
    //         .json({ message: "El parametro 'id' no es numérico" });
    //     const findProduct = await this.getProductById(Number(id));
    //     if (!findProduct)
    //       return res
    //         .status(404)
    //         .json({ message: 'El producto que intenta buscar, no existe!' });
    //     const response =
    //       findProduct.barCode &&
    //       (await axios.get(findProduct.barCode, {
    //         responseType: 'arraybuffer',
    //       }));
    //     if (!response)
    //       return res
    //         .status(400)
    //         .json({ message: 'Ocurrio un error al intentar obtener imagen' });
    //     const imageBuffer = Buffer.from(response.data, 'binary');
    //     const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });
    //     const buffers: Buffer[] = [];
    //     doc.on('data', (chunk) => buffers.push(chunk));
    //     doc.on('end', () => {
    //       const pdfData = Buffer.concat(buffers);
    //       res.setHeader(
    //         'Content-Disposition',
    //         'inline; filename=codigo_de_barras.pdf'
    //       );
    //       res.setHeader('Content-Type', 'application/pdf');
    //       res.send(pdfData);
    //     });
    //     const pageWidth = doc.page.width;
    //     const pageHeight = doc.page.height;
    //     const margin = 40;
    //     const maxImageWidth = pageWidth - margin * 2;
    //     const maxImageHeight = pageHeight - margin * 2;
    //     doc.image(imageBuffer, margin, margin, {
    //       fit: [maxImageWidth, maxImageHeight],
    //       align: 'center',
    //       valign: 'center',
    //     });
    //     doc.end();
    //   } catch (error) {
    //     console.log(error);
    //     return res.status(500).json({
    //       message: 'Ocurrio un error desconocido al buscar un producto por slug',
    //       error,
    //     });
    //   }
    // }
    /**
     * Método para descargar el codigo de un producto
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    // public async downloadCodeProduct(
    //   req: Request,
    //   res: Response
    // ): Promise<Response> {
    //   const { id } = req.params;
    //   if (!isNumeric(Number(id))) {
    //     return res
    //       .status(400)
    //       .json({ message: "El parametro 'id' no es numérico" });
    //   }
    //   try {
    //     const findProduct = await this.getProductById(Number(id));
    //     if (!findProduct) {
    //       return res
    //         .status(404)
    //         .json({ message: 'El producto que intenta buscar, no existe!' });
    //     }
    //     if (!findProduct.barCode) {
    //       return res
    //         .status(400)
    //         .json({ message: 'El producto no tiene un código de barras' });
    //     }
    //     const response = await axios.get(findProduct.barCode, {
    //       responseType: 'arraybuffer',
    //     });
    //     const imageBuffer = Buffer.from(response.data, 'binary');
    //     const mimeType = response.headers['content-type'];
    //     res.setHeader(
    //       'Content-Disposition',
    //       'attachment; filename=codigo_de_barras.png'
    //     );
    //     res.setHeader('Content-Type', mimeType);
    //     return res.send(imageBuffer);
    //   } catch (error) {
    //     console.error(error);
    //     return res
    //       .status(500)
    //       .json({ message: 'Ocurrió un error al intentar obtener la imagen' });
    //   }
    // }
    /**
     * Método para crear un nuevo producto
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async createProduct(req, res) {
        try {
            const product = req.body;
            const findName = await this.getProductByName(product.name);
            if (findName)
                return res.status(409).json({
                    message: 'Ya existe un producto registrado con este nombre!',
                });
            const findSubcategory = product.subcategoryId &&
                (await this.getSubcategoryById(product.subcategoryId));
            if (!findSubcategory)
                return res
                    .status(404)
                    .json({ message: 'La subcategoria que intenta asignar, no existe!' });
            const image = req.file;
            if (!image) {
                return res
                    .status(400)
                    .json({ message: 'El campo imagen es requerido' });
            }
            const result = await (0, Cloudinary_1.Cloudinary)(image, 1080, 1080, 'fill', 'brl/productos');
            const url = result?.secure_url;
            if (!url)
                return res
                    .status(400)
                    .json({ message: 'Ocurrio un error al tratar de subir la imagen' });
            product.thumbnail = url;
            const response = await this.postProduct(product);
            response.id && (await this.postImageProduct(url, response.id));
            return res.status(201).json({
                message: 'Un nuevo producto ha sido registrado!',
                body: response,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar crear el producto',
                error,
            });
        }
    }
    /**
     * Método para agregra una nueva imagen a un producto
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async addImageProduct(req, res) {
        try {
            const { id } = req.params;
            if (!(0, isNumeric_1.default)(Number(id)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'id' no es numérico" });
            const findProduct = await this.getProductById(Number(id));
            if (!findProduct)
                return res.status(404).json({
                    message: 'El producto que intenta agregrar una imagen, no existe!',
                });
            const image = req.file;
            if (!image) {
                return res
                    .status(400)
                    .json({ message: 'El campo imagen es requerido' });
            }
            const result = await (0, Cloudinary_1.Cloudinary)(image, 1080, 1080, 'fill', 'brl/productos');
            const url = result?.secure_url;
            if (!url)
                return res
                    .status(400)
                    .json({ message: 'Ocurrio un error al tratar de subir la imagen' });
            const response = await this.postImageProduct(url, Number(id));
            return res.status(201).json({
                message: 'Una nueva imagen ha sido registrada!',
                body: response,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar subir una imagen al producto',
                error,
            });
        }
    }
    /**
     * Método para actualizar datos de un producto
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            if (!(0, isNumeric_1.default)(Number(id)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'id' no es numérico" });
            const findProduct = await this.getProductById(Number(id));
            if (!findProduct)
                return res
                    .status(404)
                    .json({ message: 'El producto que intenta actualizar, no existe!' });
            const product = req.body;
            const findSubcategory = product.subcategoryId &&
                (await this.getSubcategoryById(product.subcategoryId));
            if (!findSubcategory)
                return res
                    .status(404)
                    .json({ message: 'La subcategoria que intenta asignar, no existe!' });
            const response = await this.putProduct(Number(id), product);
            return res.status(200).json({
                message: 'Los datos del producto han sido actualizados!',
                body: response,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar actualizar los datos del producto',
                error,
            });
        }
    }
    /**
     * Método para cambiar la miniatura de un producto
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async updateThumbnail(req, res) {
        try {
            const { id } = req.params;
            if (!(0, isNumeric_1.default)(Number(id)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'id' no es numérico" });
            const image = req.file;
            if (!image) {
                return res
                    .status(400)
                    .json({ message: 'El campo imagen es requerido' });
            }
            const result = await (0, Cloudinary_1.Cloudinary)(image, 1080, 1080, 'fill', 'brl/productos');
            const url = result?.secure_url;
            if (!url)
                return res
                    .status(400)
                    .json({ message: 'Ocurrio un error al tratar de subir la imagen' });
            const findImage = await this.getImagesProduct(Number(id));
            const imageId = findImage[0].id;
            await this.putImageProduct(imageId, url);
            const response = await this.patchThumbnailProduct(Number(id), url);
            return res.status(200).json({ message: response });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar modificar la miniatura del producto',
                error,
            });
        }
    }
    /**
     * Método para actualizar el stock de un producto
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    // public async updateStock(req: Request, res: Response): Promise<Response> {
    //   try {
    //     const { codeProduct, stock }: { codeProduct: string; stock: number } =
    //       req.body;
    //     const findProduct = await this.getProductByCodeProduct(codeProduct);
    //     if (!findProduct)
    //       return res
    //         .status(404)
    //         .json({ message: 'El producto que intenta actualizar, no existe!' });
    //     const response = await this.patchStockProduct(codeProduct, findProduct.stock + stock);
    //     return res.status(200).json({ message: response });
    //   } catch (error) {
    //     console.log(error);
    //     return res.status(500).json({
    //       message:
    //         'Ocurrio un error desconocido al intentar modificar el stock del producto',
    //       error,
    //     });
    //   }
    // }
    /**
     * Método para actualizar el stock de un producto
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    // public async updateStockLector(req: Request, res: Response): Promise<Response> {
    //   try {
    //     const { codeProduct }: { codeProduct: string } =
    //       req.body;
    //     const findProduct = await this.getProductByCodeProduct(codeProduct);
    //     if (!findProduct)
    //       return res
    //         .status(404)
    //         .json({ message: 'El producto que intenta actualizar, no existe!' });
    //     const response = await this.patchStockProduct(codeProduct, findProduct.stock + 1);
    //     return res.status(200).json({ message: response });
    //   } catch (error) {
    //     console.log(error);
    //     return res.status(500).json({
    //       message:
    //         'Ocurrio un error desconocido al intentar modificar el stock del producto',
    //       error,
    //     });
    //   }
    // }
    /**
     * Método para cambiar el codigo de un producto
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    // public async updateCodeProduct(
    //   req: Request,
    //   res: Response
    // ): Promise<Response> {
    //   try {
    //     const { id } = req.params;
    //     if (!isNumeric(Number(id)))
    //       return res
    //         .status(400)
    //         .json({ message: "El parametro 'id' no es numérico" });
    //     const findProduct = await this.getProductById(Number(id));
    //     if (!findProduct)
    //       return res
    //         .status(404)
    //         .json({ message: 'El producto que intenta actualizar, no existe!' });
    //     const { codeProduct }: { codeProduct: string } = req.body;
    //     const barcodeImage = await generateBarcodeImage(codeProduct);
    //     const barcodeResult = await CloudinaryBase64(
    //       barcodeImage,
    //       1200,
    //       400,
    //       'pad',
    //       'brl/barcodes'
    //     );
    //     if (!barcodeResult?.secure_url) {
    //       return res.status(400).json({
    //         message: 'Error al subir la imagen del código de barras a Cloudinary',
    //       });
    //     }
    //     const barCode = barcodeResult.secure_url;
    //     const response = await this.patchCodeProduct(
    //       Number(id),
    //       codeProduct,
    //       barCode
    //     );
    //     return res.status(200).json({ message: response });
    //   } catch (error) {
    //     console.log(error);
    //     return res.status(500).json({
    //       message:
    //         'Ocurrio un error desconocido al intentar modificar el codigo del producto',
    //       error,
    //     });
    //   }
    // }
    /**
     * Método para eliminar un producto
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async trashProduct(req, res) {
        try {
            const { id } = req.params;
            if (!(0, isNumeric_1.default)(Number(id)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'id' no es numérico" });
            const findProduct = await this.getProductById(Number(id));
            if (!findProduct)
                return res
                    .status(404)
                    .json({ message: 'El producto que intenta eliminar, no existe!' });
            const response = await this.deleteProduct(Number(id));
            return res.status(200).json({ message: response });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar eliminar el producto',
                error,
            });
        }
    }
    /**
     * Método para eliminar una imagen de un producto
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async trashImageProduct(req, res) {
        try {
            const { imageId } = req.params;
            if (!(0, isNumeric_1.default)(Number(imageId)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'imageId' no es numérico" });
            const findImage = await this.getImageById(Number(imageId));
            if (!findImage)
                return res
                    .status(404)
                    .json({ message: 'La imagen que intenta eliminar, no existe!' });
            const response = await this.deleteImageProduct(Number(imageId));
            return res.status(200).json({ message: response });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar eliminar la imagen del producto',
                error,
            });
        }
    }
}
exports.default = ProductController;
