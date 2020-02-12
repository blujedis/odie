var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { createXmlHttp } from './xmlhttp';
import { DEFAULTS, CONTENT_TYPE_MAP } from './constants';
import { isPlainObject, normalizeUrl, isXHR } from './utils';
function handleResponse(res) {
    var contentType = (res.headers.get('content-type') || 'unknown').split(';')[0];
    var resolveType = CONTENT_TYPE_MAP[contentType];
    resolveType = res[resolveType].bind(res) || res.text.bind(res);
    var ok = res.ok, status = res.status, statusText = res.statusText;
    return resolveType()
        .then(function (data) { return ({ ok: ok, status: status, statusText: statusText, data: data }); });
}
function handleError(err) {
    // tslint:disable-next-line
    console.error("fetch: " + err.status + ": " + err.statusText);
    return err;
}
function handleFetch(options) {
    return fetch(options.url, options)
        .then(function (res) {
        return handleResponse(res);
    })
        .catch(function (err) {
        err.status = err.status || 500;
        err.statusText = err.statusText || 'Unknown server error.';
        return handleError(err);
    });
}
function handleXhr(options) {
    return new Promise(function (resolve, reject) {
        var xhr = createXmlHttp(options);
        if (options.username)
            xhr.open(options.method, options.url, true, options.username, options.password);
        else
            xhr.open(options.method, options.url, true);
        if (options.body)
            xhr.send(options.body);
        else
            xhr.send(null);
        var err = options.onerror;
        options.onerror = function (e) {
            if (err)
                err(e);
            reject(e);
        };
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                var status_1 = xhr.status;
                var ok = status_1 < 400;
                var statusText = xhr.statusText;
                var isJSON = xhr.getResponseHeader('accept');
                var payload = isJSON ? JSON.parse(xhr.responseText) : xhr.responseText;
                var result = {
                    ok: ok,
                    status: status_1,
                    statusText: statusText,
                    data: payload
                };
                resolve(result);
            }
        };
    });
}
/**
 * Creates an instance of Odie.
 *
 * @param baseOrDefaults base url or fetch defaults.
 * @param defaults optional defaults when first arg is base url.
 */
function createInstance(baseOrDefaults, defaults) {
    if (isPlainObject(baseOrDefaults)) {
        defaults = baseOrDefaults;
        baseOrDefaults = undefined;
    }
    baseOrDefaults = baseOrDefaults || '';
    defaults = defaults || __assign({}, DEFAULTS);
    function createRequest() {
        var request = {
            _options: {},
            config: _config,
            mode: _mode,
            cache: _cache,
            credentials: _credentials,
            policy: _policy,
            headers: _headers,
            header: _header,
            content: _content,
            accept: _accept,
            url: _url,
            params: _params,
            body: _body,
            auth: _auth,
            method: _method,
            get: _get,
            put: _put,
            patch: _patch,
            post: _post,
            delete: _delete,
            on: _on,
            fetch: _fetch,
            xhr: _xhr
        };
        function _config(opts) {
            request._options = __assign(__assign({}, request._options), opts);
            return request;
        }
        function _mode(mode) {
            request._options.mode = mode;
            return request;
        }
        function _cache(cache) {
            request._options.cache = cache;
            return request;
        }
        function _credentials(credentials) {
            request._options.credentials = credentials;
            return request;
        }
        function _policy(policy) {
            request._options.referrerPolicy = policy;
            return request;
        }
        function _headers(headers) {
            request._options.headers = __assign(__assign({}, (request._options.headers)), headers);
            return request;
        }
        function _header(name, value) {
            request._options.headers[name] = value;
            return request;
        }
        function _content(value) {
            request._options.headers['Content-Type'] = value;
            return request;
        }
        function _accept(value) {
            // tslint:disable-next-line: no-string-literal
            request._options.headers['Accept'] = value;
            return request;
        }
        function _url(value, params) {
            if (value)
                request._options.url = value;
            return request.params(params);
        }
        function _params(params) {
            request._options.params = params;
            return request;
        }
        function _body(value) {
            request._options.body = value;
            return request;
        }
        function _auth(value, schema) {
            // tslint:disable-next-line:no-string-literal
            request._options.headers['Authorization'] = value;
            if (schema)
                // tslint:disable-next-line:no-string-literal
                request._options.headers['Authorization'] = schema + " " + value;
            return request;
        }
        function _method(value) {
            request._options.method = value;
            return request;
        }
        function _get() {
            return request.fetch();
        }
        function _put(body) {
            request._options.method = 'put';
            request._options.body = body || request._options.body;
            return request.fetch();
        }
        function _patch(body) {
            request._options.method = 'patch';
            request._options.body = body || request._options.body;
            return request.fetch();
        }
        function _post(body) {
            request._options.method = 'post';
            request._options.body = body || request._options.body;
            return request.fetch();
        }
        function _delete() {
            request._options.method = 'delete';
            return request.fetch();
        }
        function _on(type, event) {
            if (type === 'progress')
                event = function (e) {
                    if (e.lengthComputable)
                        return event(e, e.loaded / e.total);
                    return event(e);
                };
            request._options["on" + type] = event;
            return request;
        }
        function _fetch() {
            var _a = request._options, url = _a.url, params = _a.params, stringifyOptions = _a.stringifyOptions;
            request._options.url = normalizeUrl(baseOrDefaults, url, params, stringifyOptions);
            if (isXHR(request._options))
                return handleXhr(__assign(__assign({}, defaults), request._options));
            return handleFetch(__assign(__assign({}, defaults), request._options));
        }
        // Returns instantiated instance of xhr.
        function _xhr() {
            var _a = request._options, url = _a.url, params = _a.params, stringifyOptions = _a.stringifyOptions;
            request._options.url = normalizeUrl(baseOrDefaults, url, params, stringifyOptions);
            return createXmlHttp(__assign(__assign({}, defaults), request._options));
        }
        return request;
    }
    function initRequest(urlOrptions, methodOrOptions, options) {
        var _request = createRequest();
        if (!arguments.length)
            return _request;
        if (typeof methodOrOptions === 'object') {
            options = methodOrOptions;
            methodOrOptions = undefined;
        }
        if (typeof urlOrptions === 'object') {
            options = urlOrptions;
            urlOrptions = undefined;
        }
        _request._options = __assign({}, options);
        if (!urlOrptions)
            return _request;
        _request._options.url = urlOrptions;
        if (methodOrOptions)
            _request._options.method = methodOrOptions;
        return _request.fetch();
    }
    return initRequest;
}
export default createInstance;
//# sourceMappingURL=fido.js.map