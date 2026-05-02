const PII_PARAM_KEYS = new Set([
  'phone',
  'phone_number',
  'email',
  'email_address',
  'name',
  'full_name',
  'first_name',
  'last_name',
  'message'
]);

const getPathWithQueryAndHash = () => {
  if (typeof window === 'undefined') return '';
  return `${window.location.pathname || ''}${window.location.search || ''}${window.location.hash || ''}`;
};

const sanitizeDestinationUrl = (value) => {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('tel:')) return 'tel:';
  if (trimmed.startsWith('mailto:')) return 'mailto:';
  return trimmed;
};

const sanitizeParams = (params = {}) =>
  Object.entries(params).reduce((acc, [key, value]) => {
    if (!key || PII_PARAM_KEYS.has(key)) return acc;
    if (value === undefined || value === null || value === '') return acc;
    acc[key] = key === 'destination_url' ? sanitizeDestinationUrl(value) : value;
    return acc;
  }, {});

export const pushDataLayerEvent = (eventName, params = {}) => {
  if (!eventName || typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];

  const payload = {
    event: eventName,
    page_path: getPathWithQueryAndHash(),
    page_title: typeof document !== 'undefined' ? document.title : '',
    ...sanitizeParams(params)
  };

  window.dataLayer.push(payload);
};

export const isWhatsAppUrl = (url = '') => /wa\.link|wa\.me|api\.whatsapp\.com/i.test(url);
