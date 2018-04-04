import { routerRedux } from 'dva/router';
import authService from '../services/auth';
import { setToken, setTokenExpired } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }: any, { call, put }: any) {
      const response = yield call(authService.login, payload);

      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
    },

    *logout(_: any, { put, select }: any) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state: any, { payload }: any) {
      
      if (payload.data) {
        setToken(payload.data);
      } else {
        setTokenExpired();
      }

      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
