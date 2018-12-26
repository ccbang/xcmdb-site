import { queryHosts, createHost, updateHost, removeHost } from '@/services/api';

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
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeHost : updateHost;
      } else {
        callback = createHost;
      }
      yield call(callback, payload); // post
      yield put({
        type: 'fetch',
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        list: Array.isArray(payload.list) ? payload.list : [],
        pagination: payload.pagination || {},
      };
    },
  },
};
