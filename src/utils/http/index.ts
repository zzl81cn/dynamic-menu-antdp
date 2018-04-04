import fetch from 'dva/fetch';
import { routerRedux } from 'dva/router';
import store from '../../index';
import HttpHelper from './helper';
import { getAuthority } from '../authority';

export default class Http {
  /**
   * 请求默认超时时间
   */
  private static readonly defaultTimeout = 1 * 1000;

  /**
   * Requests a URL, returning a promise.
   *
   * @param  {string} url       The URL we want to request
   * @param  {object} [options] The options we want to pass to "fetch"
   * @return {object}           An object containing either "data" or "err"
   */
  static async request(url: string, options?: any) {
    const defaultOptions = {
      credentials: 'include',
      timeout: Http.defaultTimeout,
    };
    
    const token = getAuthority();
    const newOptions = { ...defaultOptions, ...options, headers: {  token: token } };
    
    if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
      if (!(newOptions.body instanceof FormData)) {
        newOptions.headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          ...newOptions.headers,
        };
        newOptions.body = JSON.stringify(newOptions.body);
      } else {
        // newOptions.body is FormData
        newOptions.headers = {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          ...newOptions.headers,
        };
      }
    }

    return Promise
            .race([HttpHelper.timeout(newOptions.timeout), fetch(url, newOptions)])
            .then(HttpHelper.checkStatus)
            .then((response) => {
              if (newOptions.method === 'DELETE' || response.status === 204) {
                return response.text();
              }
              return response.json();
            })
            .catch((e) => {
              const status = e.name;
              const { dispatch } = store;

              if (status === 401) {
                dispatch({
                  type: 'login/logout',
                });
                return;
              }
              if (status === 403) {
                dispatch(routerRedux.push('/exception/403'));
                return;
              }
              if (status <= 504 && status >= 500) {
                dispatch(routerRedux.push('/exception/500'));
                return;
              }
              if (status >= 404 && status < 422) {
                dispatch(routerRedux.push('/exception/404'));
              }
            });
  }

  static async post(url: string, options?: any) {
    options = {...options, method: 'POST'};
    return Http.request(url, options);
  }
}