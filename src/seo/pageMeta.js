export const HOME_META = {
  title: 'Office Pods & Office Booths Malaysia | Ace Office Pods',
  description:
    'Ace Office Pods supplies acoustic office pods, phone booths, and meeting pods in Malaysia for private calls, focused work, and small meetings.'
};

export const getProductMeta = (product) => {
  const name = product.displayTitle || product.name;
  const hasFinalStandardPrice = product.priceBasis?.startsWith('final standard');
  const price = product.pricing?.amount || `${hasFinalStandardPrice ? '' : 'From '}RM${product.startingPrice?.toLocaleString('en-MY')}`;
  const priceContext = hasFinalStandardPrice
    ? `${price} as a final standard Klang Valley total`
    : product.priceBasis === 'pod only' || product.slug === 'ace-uno'
      ? `${price} for the pod only`
      : `${price} in Malaysia`;

  return {
    title: product.metaTitle || `${name} Office Pod Price & Specs | Ace Office Pods`,
    description:
      product.metaDescription ||
      `${name}: ${product.shortDesc}. ${priceContext}. View colours, options, delivery, and installation details.`
  };
};

const PRODUCT_PUBLIC_IMAGE_SLUGS = new Set(['ace-uno', 'ace-plus', 'ace-flex', 'ace-flex-duo', 'ace-meet', 'ace-hub', 'ace-pod-one', 'ace-pod-four']);

export const getProductPublicImage = (slug) => (PRODUCT_PUBLIC_IMAGE_SLUGS.has(slug) ? `/products/${slug}.png` : undefined);
