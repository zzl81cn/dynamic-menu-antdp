import { query as queryUsers, queryCurrent } from '../services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    /**
     * 用户列表(暂时不需要)
     */
    *fetch(_: any, { call, put }: any) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    /**
     * 获取当前登录用户的详细信息(依据token或cookie)
     */
    *fetchCurrent(_: any, { call, put }: any) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
      yield put({
        type: 'changeNotifyCount',
        payload: 3
      });
    },
  },

  reducers: {
    save(state: any, action: any) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state: any, action: any) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state: any, action: any) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
