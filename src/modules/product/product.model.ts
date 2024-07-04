import { Decimal } from "@prisma/client/runtime/library"
import Subcategory from "../subcategory/subcategory.model"

interface Product {
  id?              : number
  name             : string
  slug             : string
  thumbnail?       : string
  status?          : 'Habilitado' | 'Deshabilitado'
  subcategoryId?   : number
  subcategory?     : Subcategory
  business?        : {
    id             : number
    position       : number
    codeBusiness   : string
    investment     : Decimal
    price          : Decimal
    priceOffer?    : Decimal | null
    stock          : number
    quantityDrawer : number
    barCode        : string
    productId?     : number
    supplier?      : {
      fullName     : string
    } 
  }[]
  image?           : {
    id             : number
    url            : string
  }[]
  createdAt?       : Date
  updatedAt?       : Date
}

export default Product