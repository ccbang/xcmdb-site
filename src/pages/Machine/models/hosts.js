import { queryHosts, createHost, updateHost, removeHost, blukHost } from '@/services/api';
import { message } from 'antd';

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
    *blukSubmit({ payload }, { call, put }) {
      const response = yield call(blukHost, payload);
      if (response && response.message === 'ok') {
        yield put({ type: 'fetch' });
      } else {
        message.error('批量处理发送了错误.');
      }
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
