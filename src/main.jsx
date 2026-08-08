import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CompareOfficePodsPage from './pages/CompareOfficePodsPage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import InstallationSupportPage from './pages/InstallationSupportPage';
import LocationsPage from './pages/LocationsPage';
import NotFoundPage from './pages/NotFoundPage';
import OfficeChairsPage from './pages/OfficeChairsPage';
import OfficePhoneBoothMalaysiaPage from './pages/OfficePhoneBoothMalaysiaPage';
import OfficePodsNearMePage from './pages/OfficePodsNearMePage';
import OfficePodsPage from './pages/OfficePodsPage';
import PodRelocationPage from './pages/PodRelocationPage';
import PricingPage from './pages/PricingPage';
import MeetingPodsMalaysiaPage from './pages/MeetingPodsMalaysiaPage';
import Demo2Page from './pages/Demo2Page';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import ScrollToTop from './components/ScrollToTop';
import RouteTracking from './components/RouteTracking';
import './index.css';

const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage'));
const LocationPage = lazy(() => import('./pages/LocationPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));

const isDemoPath = window.location.pathname === '/demo' || window.location.pathname.startsWith('/demo/');
const routerBasename = isDemoPath ? '/demo' : '/';
const rootElement = document.getElementById('root');

// The prerendered fallback is for crawlers and first response content.
// Clear it before mounting so React does not retain a hidden duplicate subtree.
rootElement.replaceChildren();

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter basename={routerBasename}>
      <RouteTracking />
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Demo2Page mobilePodMenu />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticleDetailPage />} />
          <Route path="/office-chairs" element={<OfficeChairsPage />} />
          <Route path="/office-pods" element={<OfficePodsPage />} />
          <Route path="/office-pods-near-me" element={<OfficePodsNearMePage />} />
          <Route path="/meeting-pods-malaysia" element={<MeetingPodsMalaysiaPage />} />
          <Route path="/office-phone-booth-malaysia" element={<OfficePhoneBoothMalaysiaPage />} />
          <Route path="/compare-office-pods" element={<CompareOfficePodsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/installation-support" element={<InstallationSupportPage />} />
          <Route path="/pod-relocation" element={<PodRelocationPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/locations/:slug" element={<LocationPage />} />
          <Route path="/pods/ace-solo" element={<Navigate replace to="/pods/ace-uno" />} />
          <Route path="/pods/ace-solo-plus" element={<Navigate replace to="/pods/ace-plus" />} />
          <Route path="/pods/ace-solo-pro" element={<Navigate replace to="/pods/ace-flex" />} />
          <Route path="/pods/ace-duo" element={<Navigate replace to="/pods/ace-flex" />} />
          <Route path="/pods/ace-meeting" element={<Navigate replace to="/pods/ace-meet" />} />
          <Route path="/pods/ace-meeting-xl" element={<Navigate replace to="/pods/ace-hub" />} />
          <Route path="/pods/:slug" element={<ProductPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/draft1" element={<Navigate replace to="/" />} />
          <Route path="/demo2" element={<Navigate replace to="/" />} />
          <Route path="/demo3" element={<Navigate replace to="/" />} />
          <Route path="/seo/*" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
