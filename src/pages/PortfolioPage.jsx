import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import SeoMeta from '../components/SeoMeta';
import { SEO_KEYWORDS_COMMON } from '../seo/constants';
import { buildCanonical, createBreadcrumbSchema, organizationSchema, websiteSchema } from '../seo/schema';
import parkerLogo from '../../assets/parker-logo.png';
import alphabetLogo from '../../assets/alphabet-logo.png';
import cmacgmLogo from '../../assets/cmacgm-logo.svg';
import taylorsLogo from '../../assets/taylorsuniversity.svg';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Portfolio', path: '/portfolio' }
];

const portfolioImageModules = import.meta.glob('../../assets/Portfolio/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default'
});

const excludedPortfolioBasenames = new Set(['20250624_150024', '20250619_132036', '20250703_111306', '20250703_120024']);

const orderedCompanies = ["Parker Hannafin", 'Alphabet Capital', 'CMA CGM', "Taylor's College", 'Others'];

const companyBranding = {
  'Parker Hannafin': { logo: parkerLogo, logoAlt: 'Parker Hannafin logo' },
  'Alphabet Capital': { logo: alphabetLogo, logoAlt: 'Alphabet Capital logo' },
  'CMA CGM': { logo: cmacgmLogo, logoAlt: 'CMA CGM logo' },
  "Taylor's College": { logo: taylorsLogo, logoAlt: "Taylor's College logo" },
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
    return { src, filename, companyName };
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

export default function PortfolioPage() {
  const companySections = orderedCompanies
    .map((companyName) => ({
      companyName,
      images: groupedPortfolio[companyImageSourceMap[companyName] || companyName] || [],
      branding: companyBranding[companyName]
    }))
    .filter((section) => section.images.length > 0);

  return (
    <PageShell>
      <SeoMeta
        title="Office Pod Portfolio Malaysia | Past Installations and Project Work | Ace Office Pods"
        description="Explore Ace Office Pods portfolio projects across Malaysia. See past office pod and office booth installations for calls, focused work, and meetings with practical commercial outcomes."
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

      <section className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <div className="space-y-12 md:space-y-14">
          {companySections.map((section) => (
            <div key={section.companyName}>
              <div className="mb-5 flex items-center gap-3 border-b border-[#d9d6cf] pb-3">
                {section.branding?.logo ? (
                  <div className="flex h-[36px] w-[120px] items-center justify-start overflow-hidden rounded-[4px] bg-white px-2">
                    <img src={section.branding.logo} alt={section.branding.logoAlt} className="h-full w-full object-contain object-left" loading="lazy" />
                  </div>
                ) : null}
                <h2 className="text-[20px] font-semibold tracking-tight text-[#14181c] md:text-[24px]">{section.companyName}</h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {section.images.map((image, index) => (
                  <article key={image.src} className="overflow-hidden rounded-[10px] border border-[#ddd8cf] bg-white">
                    <div className="aspect-[4/3] w-full overflow-hidden bg-[#eceae3]">
                      <img
                        src={image.src}
                        alt={`${section.companyName} portfolio project ${index + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
