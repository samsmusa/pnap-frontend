export interface Category {
    id: number;
    name: string;
}
export interface Product {
    id: number;
    title: string;
    description: string;
    categories?: Category[];
    price: number;
    rent: number;
    published: string;
}
export interface ProductForm {
    id: number;
    title: string;
    description: string;
    categoryIds?: number[];
    price: number;
    rent: number;
    published: string;
}

export interface UserOwnProductsData {
  userProducts: Product[];
}