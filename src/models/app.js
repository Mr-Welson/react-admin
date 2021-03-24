export default {
  namespace: 'app',
  state: {
    usrInfo: {},
  },
  reducers: {
    setUsrInfo(state, { payload: usrInfo }) {
      return { ...state, ...usrInfo }
    },
  },
  effects: {
    *asyncHandle({ payload: { params } }, { put, call, select }) {
      const list = yield call(fetch, params);
      // const count = yield select(state => state.count);
      yield put({ type: 'setList', payload: { list } });
    }
  },
  // 数据订阅
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
}