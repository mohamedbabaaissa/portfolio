import { API_URL } from './config';

// The backend sends image paths like /api/img/abc.png. Point them at the backend address.
const asset = (path) => (path ? `${API_URL}${path}` : '');
const fixProject = (p) => ({ ...p, image: asset(p.image) });
const fixProfile = (p) => ({ ...p, photo: asset(p.photo) });
const fixData = (d) => ({ profile: fixProfile(d.profile), projects: d.projects.map(fixProject) });

async function request(path, options = {}) {
  const method = options.method || 'GET';
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include', // send the login cookie, also when the backend is on another address
    ...options,
    // This header is required by the backend for every change, which blocks requests coming from other websites.
    headers: { ...(method !== 'GET' ? { 'X-Requested-With': 'portfolio' } : {}), ...options.headers },
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    // no JSON body
  }
  if (!res.ok) {
    if (res.status === 401 && path.startsWith('/api/admin') && !path.endsWith('/login')) {
      window.dispatchEvent(new Event('session-expired'));
    }
    const err = new Error(data?.error || 'Something went wrong. Try again.');
    err.status = res.status;
    throw err;
  }
  return data;
}

const json = (method, body) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export const api = {
  public: () => request('/api/public').then(fixData),
  me: () => request('/api/admin/me'),
  login: (username, password) => request('/api/admin/login', json('POST', { username, password })),
  logout: () => request('/api/admin/logout', { method: 'POST' }),
  data: () => request('/api/admin/data').then(fixData),
  saveProfile: (form) => request('/api/admin/profile', { method: 'PUT', body: form }).then(fixProfile),
  createProject: (form) => request('/api/admin/projects', { method: 'POST', body: form }).then(fixProject),
  updateProject: (id, form) => request(`/api/admin/projects/${id}`, { method: 'PUT', body: form }).then(fixProject),
  deleteProject: (id) => request(`/api/admin/projects/${id}`, { method: 'DELETE' }),
};

export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// Returns an error message, or '' when the file is fine.
export function checkImage(file) {
  if (!IMAGE_TYPES.includes(file.type)) return 'Use a JPG, PNG, WebP or GIF image.';
  if (file.size > MAX_IMAGE_BYTES) return 'That image is larger than 4 MB.';
  return '';
}
