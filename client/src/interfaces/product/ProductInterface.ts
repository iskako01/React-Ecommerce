import { ProductAttributesInterface } from "./ProductAttributesInterface";

export interface ProductInterface {
  id: number;
  attributes: ProductAttributesInterface;
  count?: number;
}
