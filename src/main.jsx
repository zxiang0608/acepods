import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import CompareOfficePodsPage from './pages/CompareOfficePodsPage';
import FaqPage from './pages/FaqPage';
import InstallationSupportPage from './pages/InstallationSupportPage';
import NotFoundPage from './pages/NotFoundPage';
import OfficeChairsPage from './pages/OfficeChairsPage';
import OfficePodsPage from './pages/OfficePodsPage';
import PortfolioPage from './pages/PortfolioPage';
import PricingPage from './pages/PricingPage';
import ProductPage from './pages/ProductPage';
import './index.css';

const isDemoPath = window.location.pathname === '/demo' || window.location.pathname.startsWith('/demo/');
const routerBasename = isDemoPath ? '/demo' : '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={routerBasename}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/office-chairs" element={<OfficeChairsPage />} />
        <Route path="/office-pods" element={<OfficePodsPage />} />
        <Route path="/compare-office-pods" element={<CompareOfficePodsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/installation-support" element={<InstallationSupportPage />} />
        <Route path="/pods/:slug" element={<ProductPage />} />
        <Route path="/seo/*" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
