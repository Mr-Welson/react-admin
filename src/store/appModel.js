import { observable } from 'mobx'
import StoreEnhancer from './StoreEnhancer';

class AppModel extends StoreEnhancer {

  constructor() {
    // 定义需要缓存的数据
    const cacheList = [
      { key: 'theme', type: 'local', default: 'dark' },
    ];
    super(cacheList)
  }

  // 主题 light/dark
  @observable theme = 'dark'
  @observable loading = false;
  @observable disableMobile = false;

  setAppStore = (object) => {
    this._setData(object)
  }
}

export default new AppModel()