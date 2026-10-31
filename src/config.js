// config.js

// Using relative path for API_URL so requests go through the Vercel proxy, 
// bypassing mobile browser cross-site cookie restrictions (Safari / Brave).
export const API_URL = '';

// Secret admin dashboard path
export const ADMIN_PATH = (import.meta.env.VITE_ADMIN_PATH || 'admin').replace(/^\/+|\/+$/g, '');
export const ADMIN_BASE = `/${ADMIN_PATH}`;

// Skills displayed on the website
export const SKILLS = [
  'JavaScript',
  'Node.js',
  'React',
  'API'
];

// Public page text
export const COPY = {
  fallbackBio:
    'Write two or three sentences about yourself here: what you build, the tools you like, and the kind of work you are looking for.',
  workIntro: 'Things I have built recently. Every card is edited from the admin dashboard.',
};