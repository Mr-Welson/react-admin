import { observable } from 'mobx'
import StoreEnhancer from './StoreEnhancer';

class DemoModel extends StoreEnhancer {

  // constructor() {
  //   // 定义需要缓存的数据
  //   const cacheList = [
  //     { key: 'theme', type: 'local', default: 'dark' },
  //     { key: 'settings', type: 'local', default: {} },
  //   ];
  //   super(cacheList)
  // }

  @observable count = 0

  updateDemoStore = (object) => {
    this._setData(object)
  }
}

export default new DemoModel()