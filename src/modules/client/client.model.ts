interface Client {
  id?            : number
  fullName       : string
  documentType   : 'DNI' | 'RUC' | 'Carnet_Extranjeria'
  documentNumber : string
  email          : string
  phone          : string
  status?        : 'Habilitado' | 'Deshabilitado'
  createdAt?     : Date
  updatedAt?     : Date
}

export default Client