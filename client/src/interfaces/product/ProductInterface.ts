export interface ProductInterface {
  id: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  category: string;
  createdAt: string;
  publishedAt: string;
  image: string;
  createdBy: string | null;
  updatedBy: string | null;
}
