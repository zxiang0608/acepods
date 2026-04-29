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

const removeDemoPrefixFromCanonical = (href) => {
  if (!href) return href;
  try {
    const url = new URL(href);
    if (url.pathname === '/demo') {
      url.pathname = '/';
    } else if (url.pathname.startsWith('/demo/')) {
      url.pathname = url.pathname.replace(/^\/demo/, '');
    }
    return url.toString();
  } catch {
    return href;
  }
};

export default function SeoMeta({ title, description, canonical, keywords, ogImage = DEFAULT_OG_IMAGE, robots = 'index, follow', schemas = [] }) {
  const schemaSignature = JSON.stringify(schemas);
  const isDemoPath = window.location.pathname === '/demo' || window.location.pathname.startsWith('/demo/');
  const effectiveCanonical = isDemoPath ? removeDemoPrefixFromCanonical(canonical) : canonical;
  const effectiveRobots = isDemoPath ? 'noindex, follow' : robots;

  useEffect(() => {
    document.title = title;
    upsertMetaTag('name', 'description', description);
    upsertMetaTag('name', 'keywords', keywords);
    upsertMetaTag('name', 'robots', effectiveRobots);
    upsertMetaTag('property', 'og:type', 'website');
    upsertMetaTag('property', 'og:title', title);
    upsertMetaTag('property', 'og:description', description);
    upsertMetaTag('property', 'og:url', effectiveCanonical);
    upsertMetaTag('property', 'og:image', ogImage);
    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:title', title);
    upsertMetaTag('name', 'twitter:description', description);
    upsertMetaTag('name', 'twitter:image', ogImage);
    upsertCanonical(effectiveCanonical);

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
  }, [description, effectiveCanonical, effectiveRobots, keywords, ogImage, schemaSignature, title]);

  return null;
}
