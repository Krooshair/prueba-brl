import Admin from './admin.model';
import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';

class AdminService {
  private prisma: PrismaClient = new PrismaClient();

  /**
   * Consulta para obtener todos los administradores existentes
   * @returns Retorna la lista de administradores existentes
   */
  protected async getAdmin(): Promise<Admin[]> {
    const admin = await this.prisma.admin.findMany({
      where: {
        status: 'Habilitado',
        roleAdmin: {
          in: ['Empleado', 'Administrador']
        }
      },
      select: {
        id: true,
        fullName: true,
        documentType: true,
        documentNumber: true,
        email: true,
        phone: true,
        username: true,
        isVerify: true,
        statusUser: true,
        status: true,
        roleAdmin: true,
      },
    });
    return admin;
  }

  /**
   * Consulta para buscar un administrador existente por su id
   * @param id Identificador para ubicar al administrador buscado
   * @returns Retorna al administrador buscado o un valor nulo
   */
  protected async getAdminById(id: number): Promise<Admin | null> {
    const admin = await this.prisma.admin.findUnique({
      where: {
        id,
        status: 'Habilitado',
      },
      select: {
        id: true,
        fullName: true,
        documentType: true,
        documentNumber: true,
        email: true,
        phone: true,
        username: true,
        password: true,
        isVerify: true,
        statusUser: true,
        status: true,
        roleAdmin: true,
        secretKey: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!admin) return null;

    return admin;
  }

  /**
   * Consulta para validar si existe un administrador registrado con el correo recibido
   * @param email Correo para validar existencia del administrador
   * @returns Returna un booleano dependiendo si encuentra o no un administrador
   */
  protected async getAdminByEmail(email: string): Promise<Admin | null> {
    const admin = await this.prisma.admin.findFirst({
      where: {
        email,
        status: 'Habilitado',
      },
    });

    return admin ? admin : null;
  }

  /**
   * Consulta para validar si existe un gerente registrado
   * @returns Retorna un booleano dependiendo si encuentra o no un gerente
   */
  protected async getAdminOwner(): Promise<boolean> {
    const admin = await this.prisma.admin.findFirst({
      where: {
        roleAdmin: 'Gerente'
      }
    })

    return admin ? true : false
  }

  /**
   * Consulta para buscar un administrador registrado con el nombre de usuario recibido
   * @param username Nombre de usuario para validar existencia del administrador
   * @returns Returna al administrador buscado o un valor nulo
   */
  protected async getAdminByUsername(username: string): Promise<Admin | null> {
    const admin = await this.prisma.admin.findUnique({
      where: {
        username,
      },
    });

    return admin ? admin : null;
  }

  /**
   * Consulta para obtener el hash password de un administrador existente
   * @param id Identificador para ubicar al administrador buscado
   * @returns Retorna la constraseña del administrador buscado o un valor nulo
   */
  protected async getAdminHashPassword(id: number): Promise<string | null> {
    const admin = await this.prisma.admin.findUnique({
      where: {
        id,
        status: 'Habilitado',
      },
      select: {
        password: true,
      },
    });

    if (!admin) return null;

    return admin.password;
  }

  /**
   * Consulta para crear un nuevo administrador
   * @param admin Conjunto de datos que necesita la consulta
   * @returns Retorna al administrador creado o un valor nulo
   */
  protected async postAdmin(admin: Admin): Promise<Admin | null> {
    if (!admin.password) return null;

    const secretKey = randomBytes(64).toString('hex');

    const newAdmin = await this.prisma.admin.create({
      data: {
        fullName: admin.fullName,
        documentType: admin.documentType,
        documentNumber: admin.documentNumber,
        email: admin.email,
        phone: admin.phone,
        username: admin.username,
        password: admin.password,
        roleAdmin: admin.roleAdmin,
        secretKey,
        createdAt: new Date()
      },
      select: {
        id: true,
        fullName: true,
        documentType: true,
        documentNumber: true,
        email: true,
        phone: true,
        username: true,
        isVerify: true,
        statusUser: true,
        roleAdmin: true,
        secretKey: true
      },
    });

    return newAdmin;
  }

  /**
   * Consulta para actualizar datos de un administrador existente
   * @param id Identificador para ubicar al administrador buscado
   * @param admin Conjunto de datos que necesita la consulta
   * @returns Retorna al administrador actualizado
   */
  protected async putAdmin(id: number, admin: Admin): Promise<Admin> {
    const updAdmin = await this.prisma.admin.update({
      where: {
        id,
        status: 'Habilitado',
      },
      data: {
        fullName: admin.fullName,
        documentType: admin.documentType,
        documentNumber: admin.documentNumber,
        email: admin.email,
        phone: admin.phone,
        roleAdmin: admin.roleAdmin,
      },
      select: {
        id: true,
        fullName: true,
        documentType: true,
        documentNumber: true,
        email: true,
        phone: true,
        username: true,
        isVerify: true,
        statusUser: true,
        roleAdmin: true,
      },
    });

    return updAdmin;
  }

  /**
   * Consulta para modificar el estado de un administrador existente
   * @param id Identificador para ubicar al administrador buscado
   * @param statusUser Estado que necesita la consulta
   * @returns Retorna un mensaje confirmando la modificación
   */
  protected async putStatusAdmin(
    id: number,
    statusUser: 'Activo' | 'Suspendido' | 'Vacaciones'
  ): Promise<string> {
    await this.prisma.admin.update({
      where: {
        id,
        status: 'Habilitado',
      },
      data: {
        statusUser,
      },
    });

    return 'Estado modificado exitosamente!';
  }

  /**
   * Consulta para modificar la verificacion de un administrador
   * @param id Identificador para ubicar al administrador buscado
   * @returns Retorna un mensaje confirmando la modificación
   */
  protected async putVerifyAdmin(id: number): Promise<string> {
    await this.prisma.admin.update({
      where: {
        id,
        statusUser: 'Activo',
        status: 'Habilitado'
      },
      data: {
        isVerify: true
      }
    })

    return 'Cuenta verificada!'
  }

  /**
   * Consulta para modificar la contraseña de un administrador existente
   * @param id Identificador para ubicar al administrador buscado
   * @param password Contraseña que necesita la consulta
   * @returns Retorna un mensaje confirmando la modificación
   */
  protected async putPasswordAdmin(
    id: number,
    password: string
  ): Promise<string> {
    await this.prisma.admin.update({
      where: {
        id,
        status: 'Habilitado',
      },
      data: {
        password,
      },
    });

    return 'Contraseña modificada exitosamente!';
  }

  /**
   * Consulta para borrar un administrador existente
   * @param id Identificador para ubicar al administrador buscado
   * @returns Retorna un mensaje confirmando la eliminacion
   */
  protected async deleteAdmin(id: number): Promise<string> {
    await this.prisma.admin.update({
      where: {
        id,
        status: 'Habilitado',
      },
      data: {
        status: 'Deshabilitado',
      },
    });

    return 'Administrador eliminado exitosamente!';
  }
}

export default AdminService;
