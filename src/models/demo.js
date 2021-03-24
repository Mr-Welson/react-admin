export default {
  namespace: 'demo',
  state: {
    count: 0,
    nestedObj: {
      subObj: {
        title: 'title'
      }
    },
    list: []
  },
  // reducers: 纯函数，接受 state 和 action, 返回老的或新的 state
  reducers: {
    setCount(state, { payload: { count } }) {
      return { ...state, count }
    },
    setList(state, { payload: { list } }) {
      return { ...state, list }
    },
    // 修改嵌套数据
    setTitle(state, { payload: { title } }) {
      let subObj = { ...state.nestedObj.subObj, title }
      let nestedObj = { ...state.nestedObj, subObj }
      return { ...state, nestedObj }
    },
  },
  /**
   * generator 函数
   * @param {put} 用于触发 action, 类似 dispatch 
   * @param {call} 用于调用异步逻辑，支持 promise 
   * @param {select} 用于从 state 里获取数据 
   */
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