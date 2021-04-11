import { observable } from 'mobx'
import StoreEnhancer from './StoreEnhancer';

class UserModel extends StoreEnhancer {

  constructor() {
    const cacheList = [
      { key: 'token', cacheKey: 'zf_token', type: 'session', default: null },
      { key: 'userInfo', type: 'session', default: {} },
    ];
    super(cacheList)
  }

  @observable token = null
  @observable userInfo = {}
  @observable systemConfig = {}

  logout = () => {
    this._clearStore()
  }

  updateUserStore = (object) => {
    this._setData(object)
  }
}

export default new UserModel()