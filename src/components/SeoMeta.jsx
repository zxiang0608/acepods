import { useEffect } from 'react';
import { SEO_BASE_URL } from '../seo/constants';

const DEFAULT_OG_IMAGE = `${SEO_BASE_URL}/og-image.png`;

const upsertMetaTag = (attribute, key, content) => {
  if (!content) return;
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const upsertCanonical = (href) => {
  if (!href) return;
  let linkTag = document.head.querySelector('link[rel="canonical"]');
  if (!linkTag) {
    linkTag = document.createElement('link');
    linkTag.setAttribute('rel', 'canonical');
    document.head.appendChild(linkTag);
  }
  linkTag.setAttribute('href', href);
};

export default function SeoMeta({ title, description, canonical, ogImage = DEFAULT_OG_IMAGE, schemas = [] }) {
  const schemaSignature = JSON.stringify(schemas);

  useEffect(() => {
    document.title = title;
    upsertMetaTag('name', 'description', description);
    upsertMetaTag('name', 'robots', 'index, follow');
    upsertMetaTag('property', 'og:type', 'website');
    upsertMetaTag('property', 'og:title', title);
    upsertMetaTag('property', 'og:description', description);
    upsertMetaTag('property', 'og:url', canonical);
    upsertMetaTag('property', 'og:image', ogImage);
    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:title', title);
    upsertMetaTag('name', 'twitter:description', description);
    upsertMetaTag('name', 'twitter:image', ogImage);
    upsertCanonical(canonical);

    const oldSchemaTags = document.head.querySelectorAll('script[data-seo-schema="true"]');
    oldSchemaTags.forEach((tag) => tag.remove());

    const parsedSchemas = JSON.parse(schemaSignature);
    parsedSchemas.forEach((schemaObject) => {
      const scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      scriptTag.dataset.seoSchema = 'true';
      scriptTag.textContent = JSON.stringify(schemaObject);
      document.head.appendChild(scriptTag);
    });

    return () => {
      const cleanupSchemaTags = document.head.querySelectorAll('script[data-seo-schema="true"]');
      cleanupSchemaTags.forEach((tag) => tag.remove());
    };
  }, [canonical, description, ogImage, schemaSignature, title]);

  return null;
}
