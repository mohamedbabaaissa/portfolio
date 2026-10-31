
// Backend URL
// Empty during local development; use the Render URL in production.
export const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

// Secret admin dashboard path
export const ADMIN_PATH = (import.meta.env.VITE_ADMIN_PATH || 'admin').replace(/^\/+|\/+$/g, '');
export const ADMIN_BASE = `/${ADMIN_PATH}`;

// Skills displayed on the website
export const SKILLS = [
  'Digital Marketing',
  'JavaScript',
  'SEO',
  'Node.js',
  'Social Media',
  'API'
];

// Public page text
export const COPY = {
  fallbackBio:
    'Write two or three sentences about yourself here: what you build, the tools you like, and the kind of work you are looking for.',
  workIntro: 'Things I have built recently. Every card is edited from the admin dashboard.',
};
