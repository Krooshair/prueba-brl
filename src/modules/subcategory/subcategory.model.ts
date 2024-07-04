import Category from "../category/category.model";

interface Subcategory {
  id?         : number;
  name        : string;
  slug        : string;
  status?     : 'Habilitado' | 'Deshabilitado';
  categoryId? : number
  category?   : Category
  createdAt?  : Date;
  updatedAt?  : Date;
}

export default Subcategory