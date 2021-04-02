import { observable } from 'mobx'
import StoreEnhancer from './StoreEnhancer';

// const layoutSettings = {
//   layout: 'side', // side / top / mix
//   fixedHeader: false, // 顶部是否置顶
//   fixSiderbar: true, // 设为 false 时, 侧边栏会跟随 content 一起滚动
// }

class AppModel extends StoreEnhancer {

  constructor() {
    // 定义需要缓存的数据
    const cacheList = [
      { key: 'theme', type: 'local', default: 'dark' },
      { key: 'settings', type: 'local', default: {} },
    ];
    super(cacheList)
  }

  // 主题 light/dark
  @observable theme = 'dark'
  @observable settings = {};
  @observable loading = false;
  @observable disableMobile = false;

  setAppStore = (object) => {
    console.log(object);
    this._setData(object)
  }
}

export default new AppModel()