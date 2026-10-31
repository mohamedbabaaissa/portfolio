// config.js

// Backend URL hardcoded to your Render deployment
export const API_URL = 'https://portfolio-backend-l7j1.onrender.com';

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
  workIntro: '',
};