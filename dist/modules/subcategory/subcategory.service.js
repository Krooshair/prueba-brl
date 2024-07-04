"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class SubcategoryService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    /**
     * Consulta para obtener todos las subcategorias existentes
     * @returns Retorna la lista de subcategorias existentes
     */
    async getSubcategory() {
        const subcategory = await this.prisma.subcategory.findMany({
            where: {
                status: 'Habilitado',
                category: {
                    status: 'Habilitado'
                }
            },
            select: {
                id: true,
                name: true,
                slug: true,
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
        });
        return subcategory;
    }
    /**
     * Consulta para buscar una subcategoria existente por su id
     * @param id Identificador para ubicar a la subcategoria buscada
     * @returns Retorna a la subcategoria buscada o un valor nulo
     */
    async getSubcategoryById(id) {
        const subcategory = await this.prisma.subcategory.findUnique({
            where: {
                id,
                status: 'Habilitado',
                category: {
                    status: 'Habilitado'
                }
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
        });
        return subcategory ? subcategory : null;
    }
    /**
     * Consulta para buscar una subcategoria existente por su slug
     * @param slug Identificador para ubicar a la subcategoria buscada
     * @returns Retorna a la subcategoria buscada o un valor nulo
     */
    async getSubcategoryBySlug(slug) {
        const subcategory = await this.prisma.subcategory.findFirst({
            where: {
                slug,
                status: 'Habilitado',
                category: {
                    status: 'Habilitado'
                }
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
        });
        return subcategory ? subcategory : null;
    }
    /**
     * Consulta para obtener todas las subcategorias existentes por el id de la categoria
     * @param categoryId Identificador para ubicar a las subcategorias buscadas
     * @returns Retorna la lista de subcategorias que pertenezcan a la categoria
     */
    async getSubcategoryByCategoryId(categoryId) {
        const subcategory = await this.prisma.subcategory.findMany({
            where: {
                categoryId,
                status: 'Habilitado',
                category: {
                    status: 'Habilitado'
                }
            },
            select: {
                id: true,
                name: true,
                slug: true,
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
        });
        return subcategory;
    }
    /**
     * Consulta para validar si existe una subcategoria registrada con el nombre recibido
     * @param name Nombre para validar existencia de la subcategoria
     * @returns Returna un booleano dependiendo si encuentra o no una subcategoria
     */
    async getSubcategoryByName(name) {
        const category = await this.prisma.subcategory.findFirst({
            where: {
                name,
                status: 'Habilitado',
                category: {
                    status: 'Habilitado'
                }
            },
        });
        return category ? true : false;
    }
    /**
     * Consulta para validar si existe la categoria que se intenta asignar a la subcategoria
     * @param id Identificador para validar existencia de la categoria
     * @returns Returna un booleano dependiendo si encuentra o no a la categoria
     */
    async getCategoryById(id) {
        const category = await this.prisma.category.findUnique({
            where: {
                id,
                status: 'Habilitado'
            },
        });
        return category ? true : false;
    }
    /**
     * Consulta para crear una nueva subcategoria
     * @param subcategory Conjunto de datos que necesita la consulta
     * @returns Retorna a la subcategoria creada
     */
    async postSubcategory(subcategory) {
        const slug = subcategory.name.toLowerCase().split(' ').join('_');
        const newSubcategory = await this.prisma.subcategory.create({
            data: {
                name: subcategory.name,
                slug,
                categoryId: subcategory.categoryId || 0,
            },
            select: {
                id: true,
                name: true,
                slug: true,
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
        });
        return newSubcategory;
    }
    /**
     * Consulta para actualizar datos de una subcategoria existente
     * @param id Identificador para ubicar a la subcategoria buscada
     * @param subcategory Conjunto de datos que necesita la consulta
     * @returns Retorna a la subcategoria actualizada o un valor nulo
     */
    async putSubcategory(id, subcategory) {
        const slug = subcategory.name.toLowerCase().split(' ').join('_');
        const updCategory = await this.prisma.subcategory.update({
            where: {
                id,
                status: 'Habilitado',
            },
            data: {
                name: subcategory.name,
                slug,
                categoryId: subcategory.categoryId,
            },
            select: {
                id: true,
                name: true,
                slug: true,
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
        });
        return updCategory;
    }
    /**
     * Consulta para borrar una subcategoria existente
     * @param id Identificador para ubicar a la subcategoria buscada
     * @returns Retorna un mensaje confirmando la eliminacion
     */
    async deleteSubcategory(id) {
        await this.prisma.subcategory.update({
            where: {
                id,
                status: 'Habilitado',
            },
            data: {
                status: 'Deshabilitado',
            },
        });
        return 'Subcategoria eliminada exitosamente!';
    }
}
exports.default = SubcategoryService;
