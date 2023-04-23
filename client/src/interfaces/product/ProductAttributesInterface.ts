import { ProductImageInterface } from "./ProductImageInterface";

export interface ProductAttributesInterface {
  price: number;
  name: string;
  shortDescription: string;
  category: string;
  createdAt: string;
  pulishedAt: string;
  updateAt: string;
  longDescription: string;
  image: ProductImageInterface;
}
