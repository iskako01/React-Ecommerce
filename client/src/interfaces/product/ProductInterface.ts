export interface ProductInterface {
  count: number;
  attributes: {
    price: number;
    name: string;
    shortDescription: string;
    category: string;
    image: {
      data: {
        attributes: {
          formats: {
            medium: {
              url: string;
            };
          };
        };
      };
    };
  };
  id: number;
  name: string;
  longDescription: string;
  createdAt: string;
  publishedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
}
