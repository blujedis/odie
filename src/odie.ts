import { createXmlHttp } from './xmlhttp';
import { IRequestInit, IResponse, BodyType, Method, XHRProgressEvent } from './types';
import { DEFAULTS, CONTENT_TYPE_MAP } from './constants';
import { isPlainObject, normalizeUrl, isXHR } from './utils';
import merge from 'lodash.merge';

function handleResponse<P>(res: Response) {
  const contentType = (res.headers.get('content-type') || 'unknown').split(';')[0];
  let resolveType: any = CONTENT_TYPE_MAP[contentType];
  resolveType = res[resolveType].bind(res) || res.text.bind(res);
  const { ok, status, statusText } = res;
  return resolveType()
    .then(data => ({ ok, status, statusText, data }));
}

function handleError<P>(err): IResponse<P> {
  // tslint:disable-next-line
  console.error(`fetch: ${err.status}: ${err.statusText}`);
  return err;
}

function handleFetch<P>(options): Promise<IResponse<P>> {
  return fetch(options.url, options)
    .then(res => {
      return handleResponse<P>(res);
    })
    .catch(err => {
      err.status = err.status || 500;
      err.statusText = err.statusText || 'Unknown server error.';
      return handleError<P>(err);
    });
}

function handleXhr<P>(options: IRequestInit) {

  return new Promise<IResponse<P>>((resolve, reject) => {

    const xhr = createXmlHttp(options);

    if (options.username)
      xhr.open(options.method, options.url, true, options.username, options.password);
    else
      xhr.open(options.method, options.url, true);

    if (options.body)
      xhr.send(options.body);
    else
      xhr.send(null);

    const err = options.onerror;
    options.onerror = (e) => {
      if (err)
        err(e);
      reject(e);
    };

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        const status = xhr.status;
        const ok = status < 400;
        const statusText = xhr.statusText;
        const isJSON = xhr.getResponseHeader('accept');
        const payload = isJSON ? JSON.parse(xhr.responseText) : xhr.responseText as unknown as P;
        const result: IResponse<P> = {
          ok,
          status,
          statusText,
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
function createInstance(baseOrDefaults?: string | IRequestInit, defaults?: IRequestInit) {

  if (isPlainObject(baseOrDefaults)) {
    defaults = baseOrDefaults as IRequestInit;
    baseOrDefaults = undefined;
  }

  baseOrDefaults = baseOrDefaults || '';
  defaults = defaults || { ...DEFAULTS };

  function createRequest() {

    const request = {
      _options: {} as IRequestInit,
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

    function _config(opts?: IRequestInit) {
      request._options = { ...request._options, ...opts };
      return request;
    }

    function _mode(mode: RequestMode) {
      request._options.mode = mode;
      return request;
    }

    function _cache(cache: RequestCache) {
      request._options.cache = cache;
      return request;
    }

    function _credentials(credentials: RequestCredentials) {
      request._options.credentials = credentials;
      return request;
    }

    function _policy(policy: ReferrerPolicy) {
      request._options.referrerPolicy = policy;
      return request;
    }

    function _headers(headers: HeadersInit) {
      request._options.headers = { ...(request._options.headers), ...headers };
      return request;
    }

    function _header(name: Extract<keyof HeadersInit, string>, value: any) {
      request._options.headers[name] = value;
      return request;
    }

    function _content(value: any) {
      request._options.headers['Content-Type'] = value;
      return request;
    }

    function _accept(value: any) {
      // tslint:disable-next-line: no-string-literal
      request._options.headers['Accept'] = value;
      return request;
    }

    function _url(value: string, params: object) {
      if (value)
        request._options.url = value;
      return request.params(params);
    }

    function _params(params: object) {
      request._options.params = params;
      return request;
    }

    function _body(value: BodyType) {
      request._options.body = value;
      return request;
    }

    function _auth(value: any, schema?: string) {
      // tslint:disable-next-line:no-string-literal
      request._options.headers['Authorization'] = value;
      if (schema)
        // tslint:disable-next-line:no-string-literal
        request._options.headers['Authorization'] = `${schema} ${value}`;
      return request;
    }

    function _method(value: Method) {
      request._options.method = value;
      return request;
    }

    function _get<P = any>() {
      return request.fetch<P>();
    }

    function _put<P = any>(body?: BodyInit) {
      request._options.method = 'put';
      request._options.body = body || request._options.body;
      return request.fetch<P>();
    }

    function _patch<P = any>(body?: BodyInit) {
      request._options.method = 'patch';
      request._options.body = body || request._options.body;
      return request.fetch<P>();
    }

    function _post<P = any>(body?: BodyInit) {
      request._options.method = 'post';
      request._options.body = body || request._options.body;
      return request.fetch<P>();
    }

    function _delete<P = any>() {
      request._options.method = 'delete';
      return request.fetch<P>();
    }

    function _on(type: 'start' | 'end' | 'load' | 'progress' | 'error', event: XHRProgressEvent) {
      if (type === 'progress')
        event = (e) => {
          if (e.lengthComputable)
            return event(e, e.loaded / e.total);
          return event(e);
        };
      request._options[`on${type}`] = event;
      return request;
    }

    function _fetch<P = any>() {
      const { url, params, stringifyOptions } = request._options;
      request._options.url = normalizeUrl(baseOrDefaults as string, url, params, stringifyOptions);
      const requestOptions = merge(defaults, request._options || {});
      if (isXHR(request._options))
        return handleXhr<P>(requestOptions);
      return handleFetch<P>(requestOptions);
    }

    // Returns instantiated instance of xhr.
    function _xhr() {
      const { url, params, stringifyOptions } = request._options;
      request._options.url = normalizeUrl(baseOrDefaults as string, url, params, stringifyOptions);
      return createXmlHttp(merge(defaults, request._options));
    }

    return request;

  }

  /**
   * Creates new fetch request instance.
   */
  function initRequest<P = any>(): ReturnType<typeof createRequest>;

  /**
   * Creates new fetch request instance using options.
   * 
   * @param options fetch request options.
   */
  function initRequest<P = any>(options: IRequestInit): ReturnType<typeof createRequest>;

  /**
   * Executes new fetch request defaulting to GET method using url and options.
   * 
   * @param url the fetch request url.
   * @param options fetch reqeust options.
   */
  function initRequest<P = any>(
    url: string,
    options?: IRequestInit): Promise<IResponse<P>>;

  /**
   * Executes new fetch request using url, method and options.
   * 
   * @param url the fetch request url.
   * @param method the fetch method to be used.
   * @param options fetch reqeust options.
   */
  function initRequest<P = any>(
    url: string,
    method: Method,
    options: IRequestInit): Promise<IResponse<P>>;

  function initRequest<P = any>(
    urlOrptions?: string | IRequestInit,
    methodOrOptions?: Method | IRequestInit,
    options?: IRequestInit) {

    const _request = createRequest();

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

    _request._options = { ...options };

    if (!urlOrptions)
      return _request;

    _request._options.url = urlOrptions as string;

    if (methodOrOptions)
      _request._options.method = methodOrOptions as string;

    return _request.fetch();

  }

  return initRequest;

}

export default createInstance;
