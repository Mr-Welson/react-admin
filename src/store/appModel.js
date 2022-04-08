import { observable } from 'mobx';
import StoreEnhancer from './StoreEnhancer';
import defaultSettings from '../settings.json';

// const layoutSettings = {
//   layout: 'side', // side / top / mix
//   // fixSiderbar: true, // 设为 false 时, 侧边栏会跟随 content 一起滚动
//   theme: 'dark',
//   primaryColor: '#1890ff',
//   contentWidth: 'Fluid',
//   splitMenus: false,
// };

const initSettings = (value) => {
  return Object.assign({}, defaultSettings, value);
};

class AppModel extends StoreEnhancer {
  constructor() {
    // 定义需要缓存的数据
    const cacheList = [{ key: 'settings', type: 'local', default: defaultSettings, initHandler: initSettings }];
    super(cacheList);
  }

  // 主题 light/dark
  // @observable theme = 'dark';
  @observable settings = defaultSettings;
  @observable loading = false;
  @observable disableMobile = false;

  updateSettings = (settings) => {
    this._setData({ settings: { ...this.settings, ...settings } });
  };

  updateAppStore = (object) => {
    this._setData(object);
  };
}

export default new AppModel();
