"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isNumeric_1 = __importDefault(require("../../shared/utils/isNumeric"));
const category_service_1 = __importDefault(require("./category.service"));
class CategoryController extends category_service_1.default {
    /**
     * Método para listar todas las categorias
     * @param _req Parametro no usado de tipo Request
     * @param res Parametro de tipo Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async listCategory(_req, res) {
        try {
            const response = await this.getCategory();
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al listar categorias',
                error,
            });
        }
    }
    /**
     * Método para buscar una categoria por su id
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async searchCategoryById(req, res) {
        try {
            const { id } = req.params;
            if (!(0, isNumeric_1.default)(Number(id)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'id' no es numérico" });
            const response = await this.getCategoryById(Number(id));
            if (!response)
                return res
                    .status(404)
                    .json({ message: 'La categoria que intenta buscar, no existe!' });
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al buscar categoria por id',
                error,
            });
        }
    }
    /**
     * Método para buscar una categoria por su slug
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async searchCategoryBySlug(req, res) {
        try {
            const { slug } = req.params;
            const response = await this.getCategoryBySlug(slug);
            if (!response)
                return res
                    .status(404)
                    .json({ message: 'La categoria que intenta buscar, no existe!' });
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al buscar categoria por slug',
                error,
            });
        }
    }
    /**
     * Método para crear una nueva categoria
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async createCategory(req, res) {
        try {
            const category = req.body;
            const findName = await this.getCategoryByName(category.name);
            if (findName)
                return res.status(409).json({
                    message: 'Ya existe una categoria registrada con este nombre',
                });
            const response = await this.postCategory(category);
            return res.status(201).json({
                message: 'Una nueva categoria ha sido registrada!',
                body: response,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar crear una categoria',
                error,
            });
        }
    }
    /**
     * Método para actualizar el nombre de una categoria
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async updateCategory(req, res) {
        try {
            const { id } = req.params;
            if (!(0, isNumeric_1.default)(Number(id)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'id' no es numérico" });
            const findCategory = await this.getCategoryById(Number(id));
            if (!findCategory)
                return res.status(404).json({
                    message: 'La categoria que intenta actualizar, no existe!',
                });
            const category = req.body;
            const findName = await this.getCategoryByName(category.name);
            if (findName)
                return res.status(409).json({
                    message: 'Ya existe una categoria registrada con este nombre',
                });
            const response = await this.putCategory(Number(id), category);
            return res.status(200).json({
                message: 'El nombre de la categoria ha sido actualizada!',
                body: response,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar actualizar el nombre de la categoria',
                error,
            });
        }
    }
    /**
     * Método para deshabilitar a una categoria
     * @param req Parametro de tipo Request
     * @param res Parametro de tipoe Response
     * @returns Retorna la respuesta de la solicitud y su estado
     */
    async trashCategory(req, res) {
        try {
            const { id } = req.params;
            if (!(0, isNumeric_1.default)(Number(id)))
                return res
                    .status(400)
                    .json({ message: "El parametro 'id' no es numérico" });
            const findCategory = await this.getCategoryById(Number(id));
            if (!findCategory)
                return res.status(404).json({
                    message: 'La categoria que intenta eliminar, no existe!',
                });
            const response = await this.deleteCategory(Number(id));
            return res.status(200).json({ message: response });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Ocurrio un error desconocido al intentar eliminar la categoria',
                error,
            });
        }
    }
}
exports.default = CategoryController;
