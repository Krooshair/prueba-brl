import { PrismaClient } from '@prisma/client';
import Client from './client.model';

class ClientService {
  private prisma: PrismaClient = new PrismaClient();

  /**
   * Consulta para obtener todos los clientes existentes
   * @returns Retorna la lista de clientes existentes
   */
  protected async getClient(): Promise<Client[]> {
    const client = await this.prisma.client.findMany({
      where: {
        status: 'Habilitado',
      },
      select: {
        id: true,
        fullName: true,
        documentType: true,
        documentNumber: true,
        email: true,
        phone: true,
      },
    });

    return client;
  }

  /**
   * Consulta para buscar un cliente existente por su id
   * @param id Identificador para ubicar al cliente buscado
   * @returns Retorna al cliente buscado o un valor nulo
   */
  protected async getClientById(id: number): Promise<Client | null> {
    const client = await this.prisma.client.findUnique({
      where: {
        id,
        status: 'Habilitado',
      },
    });

    return client ? client : null;
  }

  /**
   * Consulta para buscar un cliente existente por su numero de documento
   * @param documentNumber Numero de documento para ubicar al cliente buscado
   * @returns Retorna al cliente buscado o un valor nulo
   */
  protected async getClientByDocumentNumber(
    documentNumber: string
  ): Promise<Client | null> {
    const client = await this.prisma.client.findFirst({
      where: {
        documentNumber,
        status: 'Habilitado',
      },
    });

    return client ? client : null;
  }

  /**
   * Consulta para crear un nuevo cliente
   * @param client Conjunto de datos que necesita la consulta
   * @returns Retorna al cliente creado
   */
  protected async postClient(client: Client): Promise<Client> {
    const newClient = await this.prisma.client.create({
      data: {
        fullName: client.fullName,
        documentType: client.documentType,
        documentNumber: client.documentNumber,
        email: client.email,
        phone: client.phone,
        createdAt: new Date()
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

    return newClient
  }

  /**
   * Consulta para actualizar datos de un cliente existente
   * @param id Identificador para ubicar al cliente buscado
   * @param client Conjunto de datos que necesita la consulta
   * @returns Retorna al cliente actualizado
   */
  protected async putClient(id: number, client: Client): Promise<Client> {
    const updClient = await this.prisma.client.update({
      where: {
        id,
        status: 'Habilitado'
      },
      data: {
        fullName: client.fullName,
        documentType: client.documentType,
        documentNumber: client.documentNumber,
        email: client.email,
        phone: client.phone
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

    return updClient
  }

  /**
   * Consulta para borrar un cliente existente
   * @param id Identificador para ubicar al cliente buscado
   * @returns Retorna un mensaje confirmando la eliminacion
   */
  protected async deleteClient(id: number): Promise<string> {
    await this.prisma.client.update({
      where: {
        id,
        status: 'Habilitado'
      },
      data: {
        status: 'Deshabilitado'
      }
    });
    return 'Cliente eliminado exitosamente!'
  }
}

export default ClientService;
