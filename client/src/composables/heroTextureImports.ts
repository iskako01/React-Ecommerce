type ImageObject = { [key: string]: string };

const importAllImages = (r: any): ImageObject => {
  return r.keys().reduce((acc: ImageObject, item: string) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});
};

export const heroTextureImports: ImageObject = importAllImages(
  import.meta.glob("../../assets/images/carousel", { eager: true })
);
