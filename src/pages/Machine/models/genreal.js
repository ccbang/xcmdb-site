import {
  queryGeneral,
  createGeneral,
  updateGeneral,
  removeGeneral,
  removeGeneralBluk,
  disableGeneral,
} from '@/services/api';

export default {
  namespace: 'general',

  state: {
    list: [],
    pagination: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryGeneral, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *removeBluk({ payload }, { call, put }) {
      const response = yield call(removeGeneralBluk, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *disable({ payload }, { call, put }) {
      const response = yield call(disableGeneral, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeGeneral : updateGeneral;
      } else {
        callback = createGeneral;
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
        list: Array.isArray(payload) ? payload : [],
        pagination: payload.pagination || {},
      };
    },
  },
};
