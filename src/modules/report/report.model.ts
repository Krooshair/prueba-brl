import { Decimal } from '@prisma/client/runtime/library';

export type Report = {
  totalSold            : Decimal;
  totalInvested?       : Decimal;
  incomeStatus?        : 'Ganancia' | 'Recuperado' | 'Perdida'
  sale?                : {
    id                 : number
    codeSale           : string
    totalAmount?       : Decimal
    saleBusiness?      : {
      businessId?      : number
      business?        : {
        id?            : number
        codeBusiness?  : string
        product        : {
          id           : number
          name         : string
        }
        initialStock   : number
        stock          : number
        statusBusiness : 'Activo' | 'En_cola' | 'Culminado'
      }
      quantity         : number
    }[],
    adminId?           : number
    admin?             : {
      id               : number
      fullName         : string
      documentType     : 'DNI' | 'RUC' | 'Carnet_Extranjeria'
      documentNumber   : string
      email            : string
      phone            : string
    }
    clientId?          : number
    client?            : {
      id               : number
      fullName         : string
      documentType     : 'DNI' | 'RUC' | 'Carnet_Extranjeria'
      documentNumber   : string
      email            : string
      phone            : string
    }
  }[];
};

export type AnnualReport = {
  [key: string]: Report | null;
};
