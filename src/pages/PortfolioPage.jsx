import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import PageShell from '../components/PageShell';
import SeoMeta from '../components/SeoMeta';
import { SEO_KEYWORDS_COMMON } from '../seo/constants';
import { buildCanonical, createBreadcrumbSchema, organizationSchema, websiteSchema } from '../seo/schema';
import { getGalleryAvifSource } from '../lib/galleryImages';
import parkerLogo from '../../assets/parker-logo.png';
import alphabetLogo from '../../assets/alphabet-logo.png';
import cmacgmLogo from '../../assets/cmacgm-logo.svg';
import everllenceLogo from '../../assets/everllence-logo.png';
import taylorsLogo from '../../assets/taylorsuniversity.svg';
import brenntagLogo from '../../assets/brenntag-logo.webp';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Portfolio', path: '/portfolio' }
];

const portfolioImageModules = import.meta.glob('../../assets/Portfolio/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default'
});

const excludedPortfolioBasenames = new Set(['20250624_150024', '20250619_132036', '20250703_111306', '20250703_120024']);

const orderedCompanies = ['Everllence', "Parker Hannafin", 'Alphabet Capital', 'CMA CGM', "Taylor's College", 'Brenntag', 'Others'];

const companyBranding = {
  Everllence: { logo: everllenceLogo, logoAlt: 'Everllence logo', location: 'Kuala Lumpur' },
  'Parker Hannafin': { logo: parkerLogo, logoAlt: 'Parker Hannafin logo', location: 'Shah Alam' },
  'Alphabet Capital': { logo: alphabetLogo, logoAlt: 'Alphabet Capital logo', location: 'Kuala Lumpur' },
  'CMA CGM': { logo: cmacgmLogo, logoAlt: 'CMA CGM logo', location: 'Bangsar, Kuala Lumpur' },
  "Taylor's College": { logo: taylorsLogo, logoAlt: "Taylor's College logo", location: 'Subang Jaya' },
  Brenntag: { logo: brenntagLogo, logoAlt: 'Brenntag logo', location: 'Shah Alam, Selangor' },
  Others: { logo: null, logoAlt: '' }
};
const companyImageSourceMap = {
  'Parker Hannafin': 'Alphabet Capital',
  'Alphabet Capital': 'Parker Hannafin'
};

const groupedPortfolio = Object.entries(portfolioImageModules)
  .filter(([path]) => !excludedPortfolioBasenames.has(path.split('/').pop().replace(/\.[^.]+$/, '')))
  .map(([path, src]) => {
    const segments = path.split('/');
    const filename = segments[segments.length - 1];
    const companyName = segments[segments.length - 2];
    return { src, avifSrc: getGalleryAvifSource(src), filename, companyName };
  })
  .filter((item) => orderedCompanies.includes(item.companyName))
  .sort((a, b) => a.filename.localeCompare(b.filename))
  .reduce((acc, item) => {
    if (!acc[item.companyName]) {
      acc[item.companyName] = [];
    }
    acc[item.companyName].push(item);
    return acc;
  }, {});

const getVisiblePortfolioImages = (images) => (images.length > 9 ? images.slice(0, 9) : images);

export default function PortfolioPage() {
  const [activeGallery, setActiveGallery] = useState(null);
  const companySections = orderedCompanies
    .map((companyName) => {
      const images = groupedPortfolio[companyImageSourceMap[companyName] || companyName] || [];

      return {
        companyName,
        images: getVisiblePortfolioImages(images),
        branding: companyBranding[companyName]
      };
    })
    .filter((section) => section.images.length > 0);

  useEffect(() => {
    if (!activeGallery) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveGallery(null);
      } else if (event.key === 'ArrowLeft') {
        setActiveGallery((current) => ({
          ...current,
          index: (current.index - 1 + current.images.length) % current.images.length
        }));
      } else if (event.key === 'ArrowRight') {
        setActiveGallery((current) => ({
          ...current,
          index: (current.index + 1) % current.images.length
        }));
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeGallery]);

  const moveGallery = (direction) => {
    setActiveGallery((current) => ({
      ...current,
      index: (current.index + direction + current.images.length) % current.images.length
    }));
  };

  return (
    <PageShell>
      <SeoMeta
        title="Office Pod Installations Malaysia | Ace Portfolio"
        description="Explore completed Ace Office Pods projects across Malaysia, including office booth and meeting pod installations for corporate and education workplaces."
        canonical={buildCanonical('/portfolio')}
        keywords={`${SEO_KEYWORDS_COMMON}, office pod portfolio, office booth installation`}
        schemas={[organizationSchema, websiteSchema, createBreadcrumbSchema(breadcrumbs)]}
      />

      <section className="mx-auto w-full max-w-[1200px] px-5 pb-6 pt-10 md:px-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#65707a]">
          <Link to="/" className="hover:text-[#145b5f]">
            Home
          </Link>{' '}
          / <span>Portfolio</span>
        </nav>

        <h1 className="text-[34px] font-bold leading-[1.08] tracking-tight text-[#14181c] md:text-[48px]">Past office pod projects across Malaysia</h1>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-5 pb-16 md:px-8 md:pb-20">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-14">
          {companySections.map((section) => (
            <article key={section.companyName} className="min-w-0">
              <div className="mb-4 flex min-h-[52px] items-center gap-3 border-b border-[#d9d6cf] pb-3">
                {section.branding?.logo ? (
                  <div className="flex h-[36px] w-[112px] shrink-0 items-center justify-start overflow-hidden">
                    <img
                      src={section.branding.logo}
                      alt={section.branding.logoAlt}
                      className="h-full w-full object-contain object-left mix-blend-multiply"
                      loading="lazy"
                    />
                  </div>
                ) : null}
                <div>
                  <h2 className="text-[18px] font-semibold tracking-tight text-[#14181c] md:text-[20px]">{section.companyName}</h2>
                  {section.branding?.location ? <p className="mt-0.5 text-[12px] text-[#65707a]">{section.branding.location}</p> : null}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {section.images.map((image, imageIndex) => (
                  <button
                    key={image.src}
                    type="button"
                    className="aspect-[4/3] overflow-hidden rounded-[6px] bg-[#eceae3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145b5f]"
                    aria-label={`Open ${section.companyName} project image ${imageIndex + 1}`}
                    onClick={() =>
                      setActiveGallery({
                        companyName: section.companyName,
                        images: section.images,
                        index: imageIndex
                      })
                    }
                  >
                    <picture className="block h-full w-full">
                      {image.avifSrc ? <source srcSet={image.avifSrc} type="image/avif" /> : null}
                      <img
                        src={image.src}
                        alt={
                          section.companyName ? `Ace Pods office pod installation for ${section.companyName}` : 'Ace Pods office pod installation project'
                        }
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </picture>
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {activeGallery ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeGallery.companyName} project gallery`}
          onClick={() => setActiveGallery(null)}
        >
          <button
            type="button"
            aria-label="Close gallery"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black md:right-7 md:top-7"
            onClick={() => setActiveGallery(null)}
          >
            <X size={24} />
          </button>

          <button
            type="button"
            aria-label="Previous project image"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#14181c] hover:bg-white md:left-7"
            onClick={(event) => {
              event.stopPropagation();
              moveGallery(-1);
            }}
          >
            <ChevronLeft size={28} />
          </button>

          <figure className="flex max-h-full max-w-[1100px] flex-col items-center gap-3" onClick={(event) => event.stopPropagation()}>
            <picture className="flex max-h-[82vh] max-w-full items-center justify-center">
              {activeGallery.images[activeGallery.index].avifSrc ? (
                <source srcSet={activeGallery.images[activeGallery.index].avifSrc} type="image/avif" />
              ) : null}
              <img
                src={activeGallery.images[activeGallery.index].src}
                alt={`Ace Pods office pod installation for ${activeGallery.companyName}`}
                className="max-h-[82vh] max-w-full object-contain"
              />
            </picture>
            <figcaption className="text-center text-[13px] text-white/85">
              {activeGallery.companyName} · {activeGallery.index + 1} of {activeGallery.images.length}
            </figcaption>
          </figure>

          <button
            type="button"
            aria-label="Next project image"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#14181c] hover:bg-white md:right-7"
            onClick={(event) => {
              event.stopPropagation();
              moveGallery(1);
            }}
          >
            <ChevronRight size={28} />
          </button>
        </div>
      ) : null}
    </PageShell>
  );
}
