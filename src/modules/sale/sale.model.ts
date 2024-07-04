import { Decimal } from "@prisma/client/runtime/library"

type Sale = {
  id?                : number
  codeSale           : string
  deliveryType       : 'RECOJO' | 'ENVIO'
  agency?            : string | null
  region?            : string | null
  province?          : string | null
  district?          : string | null
  direction?         : string | null
  reference?         : string | null
  bills              : string
  guide?             : string | null
  totalAmount        : Decimal
  statusSale         : 'Pagado' | 'Enviando' | 'Culminado' | 'Cancelado'
  status?            : 'Habilitado' | 'Deshabilitado'
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
  createdAt?         : Date
  updatedAt?         : Date
  saleBusiness?      : {
    businessId?      : number
    business?        : {
      id             : number
      codeBusiness   : string
      product        : {
        name         : string
        thumbnail    : string
      }
      stock          : number
      price          : Decimal
      priceOffer     : Decimal | null
    }
    quantity         : number
  }[],
  business?          : {
    businessId       : number
    quantity         : number
  }[]
}

export default Sale