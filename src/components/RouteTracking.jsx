import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { pushDataLayerEvent } from '../lib/tracking';

export default function RouteTracking() {
  const location = useLocation();
  const lastTrackedRouteRef = useRef('');

  useEffect(() => {
    const routeKey = `${location.pathname}${location.search}${location.hash}`;
    if (routeKey === lastTrackedRouteRef.current) return;

    pushDataLayerEvent('virtual_page_view', {
      page_path: routeKey,
      page_title: typeof document !== 'undefined' ? document.title : '',
      page_location: typeof window !== 'undefined' ? window.location.href : '',
      page_referrer: typeof document !== 'undefined' ? document.referrer : ''
    });

    lastTrackedRouteRef.current = routeKey;
  }, [location.pathname, location.search, location.hash]);

  return null;
}
