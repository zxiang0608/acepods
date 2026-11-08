import { products } from '../data/products';
import aceMeetMenuSofaImage from '../../assets/products/catalog/ace-meet-menu-sofa.png';

const menuImageBySlug = {
  'ace-meet': aceMeetMenuSofaImage
};

const publishedProducts = products.filter((product) => product.publicationStatus !== 'prelaunch');

export const smartPodsMenuItems = publishedProducts.map((product) => ({
  title: product.name,
  description: product.shortDesc,
  image: product.catalogImage || product.thumbImage,
  menuImage: menuImageBySlug[product.slug] || null,
  imageClassName: product.catalogImageClassName || '',
  publicationStatus: product.publicationStatus || 'published',
  to: `/pods/${product.slug}`
}));

export const publishedSmartPodsMenuItems = smartPodsMenuItems;

export const homepageSmartPodsMenuItems = publishedSmartPodsMenuItems;
