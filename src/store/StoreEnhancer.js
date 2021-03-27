import { action, autorun } from "mobx";
import Utils from "@/utils";

class StoreEnhancer {
  constructor(cacheList) {
    if (cacheList && cacheList.length) {
      this.cacheList = cacheList;
      // 获取缓存数据初始化 store
      const disposer = autorun(() => {
        const initData = {};
        cacheList.forEach(v => {
          const value = Utils.getCache(v.key, v.type || 'local') || v.default;
          initData[v.key] = value;
        })
        this.setData(initData)
      }, {
        onError(error) {
          console.error(error);
        }
      })
      // 移除 autorun
      disposer()
    }
  }

  @action
  setData(object) {
    for (const key in object) {
      const value = object[key];
      this[key] = value;
      // 自动缓存数据
      if (this.cacheList) {
        const cacheItem = this.cacheList.find(v => v.key === key);
        cacheItem && Utils.setCache(key, value, cacheItem.type)
      }
    }
  }
}

export default StoreEnhancer;