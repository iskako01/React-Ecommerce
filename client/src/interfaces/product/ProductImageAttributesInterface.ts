import { ProductImageFormatsInterface } from "./ProductImageFormatsInterface";

export interface ProductImageAttributesInterface {
  alternativeText: null;
  caption: null;
  createdAt: string;
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  size: number;
  updatedAt: string;
  url: string;
  width: number;
  formats: ProductImageFormatsInterface;
}
