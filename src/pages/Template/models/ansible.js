import { queryAnsibleModule, queryAnsibleHelp } from '@/services/ansible';

export default {
  namespace: 'ansible',

  state: {
    list: [],
    help: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAnsibleModule, payload);
      yield put({
        type: 'save',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchHelp({ payload }, { call, put }) {
      const response = yield call(queryAnsibleHelp, payload);
      if (response.name) {
        yield put({
          type: 'saveHelp',
          payload: response,
        });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
    saveHelp(state, { payload }) {
      return {
        ...state,
        help: payload,
      };
    },
  },
};
