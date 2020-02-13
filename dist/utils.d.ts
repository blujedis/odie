import qs, { IStringifyOptions } from 'qs';
import { IRequestInit } from './types';
/**
 * Stringifies object as query string.
 *
 * @param obj the object to be stringified.
 */
export declare const toQuerystring: (obj: object, options?: qs.IStringifyOptions) => string;
/**
 * Checks if a value is an object.
 *
 * @param value the value to inpsect as an object.
 */
export declare function isObject(value: any): boolean;
/**
 * Checks if a value is a plain object literal.
 *
 * @param value the value to inspect as object literal.
 */
export declare function isPlainObject(value: any): boolean;
/**
 * Appends params to a url.
 *
 * @param url the url to append query params to.
 * @param params the query params to stringify.
 * @param stringifyOptions the stringify options for params.
 */
export declare function appendParams(url: string, params: object, stringifyOptions?: IStringifyOptions): string;
/**
 * Normalizes the url appending query params as needed.
 *
 * @param base the base url path.
 * @param url the current url path.
 * @param params optional query params.
 * @param stringifyOptions stringify options.
 */
export declare function normalizeUrl(base: string, url: string, params?: object, stringifyOptions?: IStringifyOptions): string;
/**
 * Checks if is contains xml http progress event handlers.
 *
 * @param options request init options.
 */
export declare function isXHR(options: IRequestInit): import("./types").XHRProgressEvent;
