interface Category {
  id?        : number;
  name       : string;
  slug       : string;
  status?    : 'Habilitado' | 'Deshabilitado';
  createdAt? : Date;
  updatedAt? : Date;
}

export default Category