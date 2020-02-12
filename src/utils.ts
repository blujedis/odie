import qs, { IStringifyOptions } from 'qs';
import { IRequestInit } from './types';

/**
 * Stringifies object as query string.
 * 
 * @param obj the object to be stringified.
 */
export const toQuerystring = (obj: object, options?: IStringifyOptions) => {
  return qs.stringify(obj, options);
};

/**
 * Checks if a value is an object.
 * 
 * @param value the value to inpsect as an object.
 */
export function isObject(value: any) {
  return value !== null && typeof value === 'object';
}

/**
 * Checks if a value is a plain object literal.
 * 
 * @param value the value to inspect as object literal.
 */
export function isPlainObject(value: any) {
  return isObject(value)
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * Appends params to a url.
 * 
 * @param url the url to append query params to.
 * @param params the query params to stringify.
 * @param stringifyOptions the stringify options for params.
 */
export function appendParams(url: string, params: object, stringifyOptions?: IStringifyOptions) {
  if (!params)
    return url;
  let _qs;
  _qs = toQuerystring(params, stringifyOptions);
  if (!_qs.includes('?'))
    return url + '?' + _qs;
  return url + '&' + _qs;
}

/**
 * Normalizes the url appending query params as needed.
 * 
 * @param base the base url path.
 * @param url the current url path.
 * @param params optional query params.
 * @param stringifyOptions stringify options.
 */
export function normalizeUrl(base: string, url: string, params?: object, stringifyOptions?: IStringifyOptions) {
  if (!base || /^.+:\/\//.test(url))
    return url;
  base = base.replace(/\/$/, '');
  url = url.replace(/^\//, '');
  url = base + '/' + url;
  if (!params)
    return url;
  return appendParams(url, params, stringifyOptions);
}

/**
 * Checks if is contains xml http progress event handlers.
 * 
 * @param options request init options.
 */
export function isXHR(options: IRequestInit) {
  return options.onload || options.onend || options.onstart || options.onprogress || options.onerror;
}
