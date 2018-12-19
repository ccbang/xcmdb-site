import { queryHosts } from '@/services/api';

export default {
  namespace: 'hosts',

  state: {
    list: [],
    pagination: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryHosts, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        list: Array.isArray(payload) ? payload : [],
        pagination: payload.pagination || {},
      };
    },
  },
};
