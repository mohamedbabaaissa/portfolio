// Where the backend lives. Empty = same address as the site (the dev server forwards /api to the backend).
// Online, set VITE_API_URL to your backend address, e.g. https://my-portfolio-api.onrender.com
export const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

// Secret address of the admin area, set in .env as VITE_ADMIN_PATH.
export const ADMIN_PATH = (import.meta.env.VITE_ADMIN_PATH || 'admin').replace(/^\/+|\/+$/g, '');
export const ADMIN_BASE = `/${ADMIN_PATH}`;

// Words in the scrolling strip. Your title from the admin is added at the front.
export const SKILLS = ['Digital Marketing', 'JavaScript', 'SEO', 'Node.js', 'Social Media', 'API'];

// Text on the public page that the admin does not edit.
export const COPY = {
  fallbackBio:
    'Write two or three sentences about yourself here: what you build, the tools you like, and the kind of work you are looking for.',
  workIntro: 'Things I have built recently. Every card is edited from the admin dashboard.',
};
