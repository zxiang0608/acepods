import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import NotFoundPage from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage';
import SeoCompareOfficePodsPage from './pages/SeoCompareOfficePodsPage';
import SeoFaqPage from './pages/SeoFaqPage';
import SeoInstallationSupportPage from './pages/SeoInstallationSupportPage';
import SeoOfficePodsPage from './pages/SeoOfficePodsPage';
import SeoPricingPage from './pages/SeoPricingPage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/seo" element={<App seoMode />} />
        <Route path="/seo/office-pods" element={<SeoOfficePodsPage />} />
        <Route path="/seo/compare-office-pods" element={<SeoCompareOfficePodsPage />} />
        <Route path="/seo/pricing" element={<SeoPricingPage />} />
        <Route path="/seo/faq" element={<SeoFaqPage />} />
        <Route path="/seo/installation-support" element={<SeoInstallationSupportPage />} />
        <Route path="/pods/:slug" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
