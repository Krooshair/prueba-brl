"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class CategoryService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    /**
     * Consulta para obtener todos las categorias existentes
     * @returns Retorna la lista de categorias existentes
     */
    async getCategory() {
        const category = await this.prisma.category.findMany({
            where: {
                status: 'Habilitado',
            },
            select: {
                id: true,
                name: true,
                slug: true,
                status: true,
            },
        });
        return category;
    }
    /**
     * Consulta para buscar una categoria existente por su id
     * @param id Identificador para ubicar a la categoria buscada
     * @returns Retorna a la categoria buscada o un valor nulo
     */
    async getCategoryById(id) {
        const category = await this.prisma.category.findUnique({
            where: {
                id,
                status: 'Habilitado'
            },
        });
        return category ? category : null;
    }
    /**
     * Consulta para buscar una categoria existente por su slug
     * @param slug Identificador para ubicar a la categoria buscada
     * @returns Retorna a la categoria buscada o un valor nulo
     */
    async getCategoryBySlug(slug) {
        const category = await this.prisma.category.findFirst({
            where: {
                slug,
                status: 'Habilitado'
            },
        });
        return category ? category : null;
    }
    /**
     * Consulta para validar si existe una categoria registrada con el nombre recibido
     * @param name Nombre para validar existencia de la categoria
     * @returns Returna un booleano dependiendo si encuentra o no una categoria
     */
    async getCategoryByName(name) {
        const category = await this.prisma.category.findFirst({
            where: {
                name,
                status: 'Habilitado'
            },
        });
        return category ? true : false;
    }
    /**
     * Consulta para crear una nueva categoria
     * @param category Conjunto de datos que necesita la consulta
     * @returns Retorna a la categoria creada
     */
    async postCategory(category) {
        const slug = category.name.toLowerCase().split(' ').join('_');
        const newCategory = await this.prisma.category.create({
            data: {
                name: category.name,
                slug,
                createdAt: new Date()
            },
            select: {
                id: true,
                name: true,
                slug: true,
                status: true,
            },
        });
        return newCategory;
    }
    /**
     * Consulta para actualizar datos de una categoria existente
     * @param id Identificador para ubicar a la categoria buscada
     * @param category Conjunto de datos que necesita la consulta
     * @returns Retorna a la categoria actualizada
     */
    async putCategory(id, category) {
        const slug = category.name.toLowerCase().split(' ').join('_');
        const updCategory = await this.prisma.category.update({
            where: {
                id,
                status: 'Habilitado',
            },
            data: {
                name: category.name,
                slug,
            },
            select: {
                id: true,
                name: true,
                slug: true,
                status: true,
            },
        });
        return updCategory;
    }
    /**
     * Consulta para borrar una categoria existente
     * @param id Identificador para ubicar a la categoria buscada
     * @returns Retorna un mensaje confirmando la eliminacion
     */
    async deleteCategory(id) {
        await this.prisma.category.update({
            where: {
                id,
                status: 'Habilitado',
            },
            data: {
                status: 'Deshabilitado',
            },
        });
        return 'Categoria eliminada exitosamente!';
    }
}
exports.default = CategoryService;
