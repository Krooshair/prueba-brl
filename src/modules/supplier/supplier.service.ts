import { PrismaClient } from "@prisma/client"
import Supplier from "./supplier.model"

class SupplierService {
  private prisma: PrismaClient = new PrismaClient()

  protected async getSupplier(): Promise<Supplier[]> {
    const supplier = await this.prisma.supplier.findMany({
      where: {
        status: 'Habilitado'
      },
      select: {
        id: true,
        fullName: true, 
        documentType: true,
        documentNumber: true,
        email: true,
        phone: true
      }
    })

    return supplier
  }

  protected async getSupplierById(id: number): Promise<Supplier | null> {
    const supplier = await this.prisma.supplier.findUnique({
      where: {
        id,
        status: 'Habilitado'
      },
      select: {
        id: true,
        fullName: true, 
        documentType: true,
        documentNumber: true,
        email: true,
        phone: true,
        business: {
          select: {
            id: true,
            codeBusiness: true
          }
        }
      }
    })

    return supplier ? supplier : null
  }

  protected async getSupplierByDocument(documentNumber: string): Promise<Supplier | null> {
    const supplier = await this.prisma.supplier.findFirst({
      where: {
        documentNumber,
        status: 'Habilitado'
      },
      select: {
        id: true,
        fullName: true, 
        documentType: true,
        documentNumber: true,
        email: true,
        phone: true,
        business: {
          select: {
            id: true,
            codeBusiness: true
          }
        }
      }
    })

    return supplier? supplier : null
  }

  protected async getSupplierByEmail(email: string): Promise<Supplier | null> {
    const supplier = await this.prisma.supplier.findFirst({
      where: {
        email,
        status: 'Habilitado'
      },
      select: {
        id: true,
        fullName: true, 
        documentType: true,
        documentNumber: true,
        email: true,
        phone: true,
        business: {
          select: {
            id: true,
            codeBusiness: true
          }
        }
      }
    })

    return supplier? supplier : null
  }

  protected async postSupplier(supplier: Supplier): Promise<Supplier> {
    const newSupplier = await this.prisma.supplier.create({
      data: {
        fullName: supplier.fullName,
        documentType: supplier.documentType,
        documentNumber: supplier.documentNumber,
        email: supplier.email,
        phone: supplier.phone
      },
      select: {
        id: true,
        fullName: true,
        documentType: true,
        documentNumber: true,
        email: true,
        phone: true
      }
    })

    return newSupplier
  }

  protected async putSupplier(id: number, supplier: Supplier): Promise<Supplier> {
    const updSupplier = await this.prisma.supplier.update({
      where: {
        id,
        status: 'Habilitado'
      },
      data: {
        fullName: supplier.fullName,
        documentType: supplier.documentType,
        documentNumber: supplier.documentNumber,
        email: supplier.email,
        phone: supplier.phone
      },
      select: {
        id: true,
        fullName: true,
        documentType: true,
        documentNumber: true,
        email: true,
        phone: true
      }
    })

    return updSupplier
  }

  protected async deleteSupplier(id: number): Promise<string> {
    await this.prisma.supplier.update({
      where:{
        id,
        status: 'Habilitado'
      },
      data: {
        status: 'Deshabilitado'
      }
    })

    return 'Proveedor borrado exitosamente!'
  }
}

export default SupplierService