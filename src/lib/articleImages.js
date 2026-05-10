import acePodsHero from '../../assets/hero-pods.png';
import officeOneImage from '../../assets/Office-1.png';
import officeTwoImage from '../../assets/office-2.png';
import officeThreeImage from '../../assets/office-3.png';
import podsInstallation from '../../assets/pods-installation.png';
import openOffice from '../../assets/open-office.png';
import aceMeetingHero from '../../assets/ace-meeting.png';
import aceMeetingXLHero from '../../assets/ace-meeting-XL.png';

const ARTICLE_IMAGE_POOL = [acePodsHero, officeOneImage, officeTwoImage, officeThreeImage, podsInstallation, openOffice, aceMeetingHero, aceMeetingXLHero];

const slugHash = (value) => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
};

export const getArticleImageBySlug = (slug) => ARTICLE_IMAGE_POOL[slugHash(slug) % ARTICLE_IMAGE_POOL.length];
