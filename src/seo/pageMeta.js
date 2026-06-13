export const HOME_META = {
  title: 'Office Pods & Office Booths Malaysia | Ace Office Pods',
  description:
    'Ace Office Pods supplies acoustic office pods, phone booths, and meeting pods in Malaysia for private calls, focused work, and small meetings.'
};

export const getProductMeta = (product) => {
  const name = product.displayTitle || product.name;
  const price = product.pricing?.amount || `From RM${product.startingPrice?.toLocaleString('en-MY')}`;

  return {
    title: `${name} Office Pod Price & Specs | Ace Office Pods`,
    description: `${name}: ${product.shortDesc}. ${price} in Malaysia. View colours, options, delivery, and installation details.`
  };
};

export const getProductPublicImage = (slug) => `/products/${slug}.png`;
