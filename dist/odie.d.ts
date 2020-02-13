import { IRequestInit, IResponse, BodyType, Method, XHRProgressEvent } from './types';
/**
 * Creates an instance of Odie.
 *
 * @param baseOrDefaults base url or fetch defaults.
 * @param defaults optional defaults when first arg is base url.
 */
declare function createInstance(baseOrDefaults?: string | IRequestInit, defaults?: IRequestInit): {
    <P = any>(): {
        _options: IRequestInit;
        config: (opts?: IRequestInit) => any;
        mode: (mode: RequestMode) => any;
        cache: (cache: RequestCache) => any;
        credentials: (credentials: RequestCredentials) => any;
        policy: (policy: ReferrerPolicy) => any;
        headers: (headers: HeadersInit) => any;
        header: (name: "forEach", value: any) => any;
        content: (value: any) => any;
        accept: (value: any) => any;
        url: (value: string, params: object) => any;
        params: (params: object) => any;
        body: (value: BodyType) => any;
        auth: (value: any, schema?: string) => any;
        method: (value: Method) => any;
        get: <P_1 = any>() => Promise<IResponse<P_1>>;
        put: <P_2 = any>(body?: BodyInit) => Promise<IResponse<P_2>>;
        patch: <P_3 = any>(body?: BodyInit) => Promise<IResponse<P_3>>;
        post: <P_4 = any>(body?: BodyInit) => Promise<IResponse<P_4>>;
        delete: <P_5 = any>() => Promise<IResponse<P_5>>;
        on: (type: "error" | "start" | "end" | "load" | "progress", event: XHRProgressEvent) => any;
        fetch: <P_6 = any>() => Promise<IResponse<P_6>>;
        xhr: () => XMLHttpRequest;
    };
    <P_7 = any>(options: IRequestInit): {
        _options: IRequestInit;
        config: (opts?: IRequestInit) => any;
        mode: (mode: RequestMode) => any;
        cache: (cache: RequestCache) => any;
        credentials: (credentials: RequestCredentials) => any;
        policy: (policy: ReferrerPolicy) => any;
        headers: (headers: HeadersInit) => any;
        header: (name: "forEach", value: any) => any;
        content: (value: any) => any;
        accept: (value: any) => any;
        url: (value: string, params: object) => any;
        params: (params: object) => any;
        body: (value: BodyType) => any;
        auth: (value: any, schema?: string) => any;
        method: (value: Method) => any;
        get: <P_1 = any>() => Promise<IResponse<P_1>>;
        put: <P_2 = any>(body?: BodyInit) => Promise<IResponse<P_2>>;
        patch: <P_3 = any>(body?: BodyInit) => Promise<IResponse<P_3>>;
        post: <P_4 = any>(body?: BodyInit) => Promise<IResponse<P_4>>;
        delete: <P_5 = any>() => Promise<IResponse<P_5>>;
        on: (type: "error" | "start" | "end" | "load" | "progress", event: XHRProgressEvent) => any;
        fetch: <P_6 = any>() => Promise<IResponse<P_6>>;
        xhr: () => XMLHttpRequest;
    };
    <P_8 = any>(url: string, options?: IRequestInit): Promise<IResponse<P_8>>;
    <P_9 = any>(url: string, method: Method, options: IRequestInit): Promise<IResponse<P_9>>;
};
export default createInstance;
