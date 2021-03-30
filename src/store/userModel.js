import { observable } from 'mobx'
import StoreEnhancer from './StoreEnhancer';

class UserModel extends StoreEnhancer {

  constructor() {
    const cacheList = [
      { key: 'token', cacheKey: 'zf_token', type: 'session', default: undefined },
      { key: 'userInfo', type: 'session', default: {} },
    ];
    super(cacheList)
  }
  
  @observable token = undefined
  @observable userInfo = {}

  setUserStore = (object) => {
    this._setData(object)
  }
}

export default new UserModel()