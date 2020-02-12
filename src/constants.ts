
export const BASE_URL = 'http://localhost:2822';

export const DEFAULTS: RequestInit = {
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json'
  }
};

export const CONTENT_TYPE_MAP = {
  'unknown': 'text',
  'text/html': 'text',
  'application/json': 'json',
  'application/octet-stream': 'blob',
  'multipart/form-data': 'formData',
  'application/json; charset=utf-8': 'json'
};
