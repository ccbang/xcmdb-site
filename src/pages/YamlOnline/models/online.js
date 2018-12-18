import { fakeRegister } from '@/services/api';

export default {
  namespace: 'online',

  state: {
    yaml: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeRegister, payload);
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
        yaml: payload,
      };
    },
  },
};
