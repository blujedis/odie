import { IRequestInit } from './types';

export function createXmlHttp(options: IRequestInit) {

  const xhr = new XMLHttpRequest();

  if (options.method !== 'post' && options.method !== 'get')
    throw new Error(`XHR method supports "get" or "post" but got ${options.method}.`);

  if (options.method === 'post') {
    xhr.upload.onload = options.onload;
    xhr.upload.onloadstart = options.onstart;
    xhr.upload.onloadend = options.onend;
    xhr.upload.onprogress = options.onprogress;
    xhr.upload.onerror = options.onerror;
  }

  else {
    xhr.onload = options.onload;
    xhr.onloadstart = options.onstart;
    xhr.onloadend = options.onend;
    xhr.onprogress = options.onprogress;
    xhr.onerror = options.onerror;
  }

  for (const k in options.headers) {
    if (!options.headers.hasOwnProperty(k)) continue;
    xhr.setRequestHeader(k, options.headers[k]);
  }

  return xhr;

}
