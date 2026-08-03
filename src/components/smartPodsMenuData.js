import { products } from '../data/products';

export const smartPodsMenuItems = products.map((product) => ({
  title: product.name,
  description: product.shortDesc,
  image: product.catalogImage || product.thumbImage,
  imageClassName: product.catalogImageClassName || '',
  to: `/pods/${product.slug}`
}));
