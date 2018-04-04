import { queryNotices } from '../services/api';
import authService from '../services/auth';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
    // 存储菜单数据(全局缓存)
    menus: [],
    // 存储路由数据(全局缓存)
    routerData: [],
  },

  effects: {
    *fetchMenus({ payload }: any, { call, put, select }: any) {
      const menus = yield call(authService.getAuthMenus);
      const routerConfig = yield select(state => state.global.routerConfig);
      const routerData = yield call(authService.getRouterData, routerConfig, menus);

      yield put({
        type: 'saveMenus',
        payload: menus,
      });

      yield put({
        type: 'saveRouterData',
        payload: routerData,
      });
    },

    *fetchNotices(_: any, { call, put }: any) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: data.length,
      });
    },

    *clearNotices({ payload }: any, { put, select }: any) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      yield put({
        type: 'user/changeNotifyCount',
        payload: count,
      });
    },
  },

  reducers: {
    changeLayoutCollapsed(state: any, { payload }: any) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state: any, { payload }: any) {
      return {
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(state: any, { payload }: any) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
    saveMenus(state: any, { payload }: any) {
      return {
        ...state,
        menus: payload,
      };
    },
    saveRouterConfig(state: any, { payload }: any) {
      return {
        ...state,
        routerConfig: payload,
      };
    },
    saveRouterData(state: any, { payload }: any) {
      return {
        ...state,
        routerData: payload,
      };
    }
  },

  subscriptions: {
    setup({ dispatch, history }: any) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof (window as any).ga !== 'undefined') {
          (window as any).ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
