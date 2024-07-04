import { PrismaClient } from '@prisma/client';
import Product from './product.model';

class ProductService {
  private prisma: PrismaClient = new PrismaClient();

  /* * AREA DE PRODUCTO * */

  /**
   * Consulta para obtener todos los productos existentes
   * @returns Retorna la lista de productos existentes
   */
  protected async getProduct(): Promise<Product[]> {
    const product = await this.prisma.product.findMany({
      where: {
        status: 'Habilitado',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        thumbnail: true,
        subcategory: {
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
        },
      },
    });

    return product;
  }

  /**
   * Consulta para buscar un producto existente por su id
   * @param id Identificador para ubicar el producto buscado
   * @returns Retorna el producto buscado o un valor nulo
   */
  protected async getProductById(id: number): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
        status: 'Habilitado',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        business: {
          select: {
            id: true,
            position: true,
            codeBusiness: true,
            investment: true,
            price: true,
            priceOffer: true,
            stock: true,
            quantityDrawer: true,
            barCode: true,
            productId: true,
          },
          orderBy: {
            position: 'asc'
          }
        },
        subcategory: {
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
        },
        image: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    return product ? product : null;
  }

  /**
   * Consulta para buscar un producto existente por su slug
   * @param slug Slug para ubicar el producto buscado
   * @returns Retorna el producto buscado o un valor nulo
   */
  protected async getProductBySlug(slug: string): Promise<Product | null> {
    const product = await this.prisma.product.findFirst({
      where: {
        slug,
        status: 'Habilitado',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        subcategory: {
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
        },
        image: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    return product ? product : null;
  }

  /**
   * Consulta para validar si existe un producto con el nombre recibido
   * @param name Nombre del producto que se intenta registrar
   * @returns Retorna un booleano dependiendo si existe o no un producto
   */
  protected async getProductByName(name: string): Promise<boolean> {
    const product = await this.prisma.product.findFirst({
      where: {
        name,
        status: 'Habilitado',
      },
    });

    return product ? true : false;
  }

  /**
   * Consulta para crear un nuevo producto
   * @param product Conjunto de datos que necesita la consulta
   * @returns Retorna el producto creado
   */
  protected async postProduct(product: Product): Promise<Product> {
    const slug = product.name
      .trim() // Eliminar espacios al principio y al final
      .replace(/[^\w\s]+/g, '') // Eliminar caracteres no permitidos excepto guiones bajos
      .replace(/\s+/g, '-') // Reemplazar espacios con guiones medios
      .toLowerCase();

    const newProduct = await this.prisma.product.create({
      data: {
        name: product.name,
        slug,
        thumbnail: product.thumbnail || '',
        subcategoryId: product.subcategoryId || 0,
        createdAt: new Date()
      },
      select: {
        id: true,
        name: true,
        slug: true,
        subcategory: {
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
        },
      },
    });

    return newProduct;
  }

  /**
   * Consulta para actualizar datos de un producto existente
   * @param id Identificador para ubicar el producto buscado
   * @param product Conjunto de datos que necesita la consulta
   * @returns Retorna el producto actualizado
   */
  protected async putProduct(id: number, product: Product): Promise<Product> {
    const slug = product.name
      .trim() // Eliminar espacios al principio y al final
      .replace(/[^\w\s]+/g, '') // Eliminar caracteres no permitidos excepto guiones bajos
      .replace(/\s+/g, '-') // Reemplazar espacios con guiones medios
      .toLowerCase();

    const updProduct = await this.prisma.product.update({
      where: {
        id,
        status: 'Habilitado',
      },
      data: {
        name: product.name,
        slug,
        subcategoryId: product.subcategoryId || 0,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        subcategory: {
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
        },
      },
    });

    return updProduct;
  }

  /**
   * Consulta para modificar la miniatura de un producto existente
   * @param id Identificador para ubicar el producto buscado
   * @param thumbnail Url de la miniatura
   * @returns Retorna un mensaje confirmando la modificacion
   */
  protected async patchThumbnailProduct(
    id: number,
    thumbnail: string
  ): Promise<string> {
    await this.prisma.product.update({
      where: {
        id,
        status: 'Habilitado',
      },
      data: {
        thumbnail,
      },
    });

    return 'La miniatura del producto fue modificada exitosamente!';
  }

  /**
   * Consulta para borrar un producto existente
   * @param id Identificador para ubicar el producto buscado
   * @returns Retorna un mensaje confirmando la eliminacion
   */
  protected async deleteProduct(id: number): Promise<string> {
    await this.prisma.product.update({
      where: {
        id,
        status: 'Habilitado',
      },
      data: {
        status: 'Deshabilitado',
      },
    });

    return 'Producto eliminado exitosamente!';
  }

  /* * AREA DE IMAGENES * */

  /**
   * Consulta para validar si existe una imagen por el id recibido
   * @param id Identificador de la imagen
   * @returns Retorna un booleando dependiendo si existe o no la imagen
   */
  protected async getImageById(id: number): Promise<boolean> {
    const image = await this.prisma.image.findUnique({
      where: {
        id,
      },
    });
    return image ? true : false;
  }

  /**
   * Consulta para listar las imagenes de un producto existente
   * @param productId Identificador del producto
   * @returns Retorna la lista de imagenes del producto buscado
   */
  protected async getImagesProduct(
    productId: number
  ): Promise<{ id: number; url: string }[]> {
    const images = await this.prisma.image.findMany({
      where: {
        productId,
      },
      select: {
        id: true,
        url: true,
      },
    });

    return images;
  }

  /**
   * Consultar para cargar una nueva imagen a un producto
   * @param url Url de la nueva imagen
   * @param productId Identificador del producto
   * @returns Retorna la imagen del producto buscado
   */
  protected async postImageProduct(
    url: string,
    productId: number
  ): Promise<{ id: number; url: string }> {
    const images = await this.prisma.image.create({
      data: {
        url,
        productId,
      },
      select: {
        id: true,
        url: true,
      },
    });
    return images;
  }

  /**
   * Consulta para actualizar la imagen de un producto
   * @param id Identificador de la imagen
   * @param url Url de la nueva imagen
   * @returns Retorna un mensaje confirmando la actualizacion
   */
  protected async putImageProduct(id: number, url: string): Promise<string> {
    await this.prisma.image.update({
      where: {
        id,
      },
      data: {
        url,
      },
    });

    return 'Imagen actualizada exitosamente!';
  }

  /**
   * Consulta para eliminar la imagen de un producto
   * @param id Identificador de la imagen
   * @returns Retorna un mensaje confirmando la eliminacion
   */
  protected async deleteImageProduct(id: number): Promise<string> {
    await this.prisma.image.delete({
      where: {
        id,
      },
    });
    return 'Imagen eliminada exitosamente!';
  }

  /* * AREA DE SUBCATEGORIA * */

  /**
   * Consultar para validar si existe una subcategoria
   * @param subcategoryId Identificador de la subcategoria
   * @returns Retorn un booleando dependiendo si existe o no una subcategoria
   */
  protected async getSubcategoryById(subcategoryId: number): Promise<boolean> {
    const subcategory = await this.prisma.subcategory.findUnique({
      where: {
        id: subcategoryId,
        status: 'Habilitado',
      },
    });

    return subcategory ? true : false;
  }
}

export default ProductService;
