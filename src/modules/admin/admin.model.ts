interface Admin {
  id?            : number
  fullName       : string
  documentType   : 'DNI' | 'RUC' | 'Carnet_Extranjeria'
  documentNumber : string
  email          : string
  phone          : string
  username       : string
  password?      : string
  isVerify       : boolean
  statusUser     : 'Activo' | 'Suspendido' | 'Vacaciones'
  status?        : 'Habilitado' | 'Deshabilitado'
  roleAdmin      : 'Gerente' | 'Administrador' | 'Empleado'
  secretKey?     : string
  createdAt?     : Date
  updatedAt?     : Date
}

export default Admin