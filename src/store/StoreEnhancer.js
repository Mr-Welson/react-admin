import { action, autorun } from "mobx";
import Utils from "@/utils";

class StoreEnhancer {
  constructor(cacheList) {
    if (cacheList && cacheList.length) {
      this._cacheList = cacheList;
      // 获取缓存数据初始化 store
      const disposer = autorun(() => {
        const initData = {};
        cacheList.forEach(v => {
          const value = Utils.getCache(v.cacheKey || v.key, v.type || 'local') || v.default;
          if (v.initHandler) {
            v.initHandler(value)
          } else {
            initData[v.key] = value;
          }
        })
        this._setData(initData)
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
  _setData(object) {
    for (const key in object) {
      const value = object[key];
      this[key] = value;
      // 自动缓存数据
      if (this._cacheList) {
        const cacheItem = this._cacheList.find(v => v.key === key);
        cacheItem && Utils.setCache(cacheItem.cacheKey || key, value, cacheItem.type)
      }
    }
  }
}

export default StoreEnhancer;