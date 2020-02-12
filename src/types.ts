import { IStringifyOptions } from 'qs';

export type BodyType = ArrayBuffer | ArrayBufferView | Blob | string | URLSearchParams | FormData;

export type XHRProgressEvent = (e: ProgressEvent<EventTarget>, progress?: number) => any;

export type Method = 'get' | 'put' | 'patch' | 'post' | 'delete';

export interface IResponse<P> {
  ok: boolean;
  status: number;
  statusText: string;
  data: P;
}

export interface IRequestInit extends RequestInit {
  url?: string; 
  params?: object;
  username?: string;
  password?: string;
  onload?: XHRProgressEvent;
  onprogress?: XHRProgressEvent;
  onstart?: XHRProgressEvent;
  onend?: XHRProgressEvent;
  onerror?: XHRProgressEvent;
  stringifyOptions?: IStringifyOptions; // see qs options for stringifying params.
}
