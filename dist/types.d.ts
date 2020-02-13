import { IStringifyOptions } from 'qs';
export declare type BodyType = ArrayBuffer | ArrayBufferView | Blob | string | URLSearchParams | FormData;
export declare type XHRProgressEvent = (e: ProgressEvent<EventTarget>, progress?: number) => any;
export declare type Method = 'get' | 'put' | 'patch' | 'post' | 'delete';
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
    stringifyOptions?: IStringifyOptions;
}
