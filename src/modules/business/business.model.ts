import { Decimal } from "@prisma/client/runtime/library"

type Business = {
  id?           : number
  position?     : number
  codeBusiness  : string
  investment    : Decimal
  price         : Decimal
  priceOffer?   : Decimal | null
  initialStock? : number
  stock         : number
  quantityDrawer: number
  barCode?      : string
  bill?         : string | null
  statusBusiness: 'Activo' | 'En_cola' | 'Culminado'
  status?       : 'Habilitado' | 'Deshabilitado'
  productId?    : number
  product?      : {
    name        : string
    thumbnail   : string
  }
  supplierId?   : number
  supplier?     : {
    id          : number
    fullName    : string
  }   
  createdAt?    : Date
  updatedAt?    : Date 
}

export default Business