type Supplier = {
  id?            : number
  fullName       : string
  documentType   : 'DNI' | 'RUC' | 'Carnet_Extranjeria'
  documentNumber : string
  email          : string | null
  phone          : string | null
  status?        : 'Habilitado' | 'Deshabilitado'
  createdAt?     : Date
  updatedAt?     : Date
  business?      : {
    id           : number
    codeBusiness : string
  }[]
}

export default Supplier