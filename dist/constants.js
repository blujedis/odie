export var BASE_URL = 'http://localhost:2822';
export var DEFAULTS = {
    method: 'get',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json'
    }
};
export var CONTENT_TYPE_MAP = {
    'unknown': 'text',
    'text/html': 'text',
    'application/json': 'json',
    'application/octet-stream': 'blob',
    'multipart/form-data': 'formData',
    'application/json; charset=utf-8': 'json'
};
//# sourceMappingURL=constants.js.map