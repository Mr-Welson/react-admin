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
          let cacheKey = v.cacheKey || v.key;
          let cacheType = v.type || 'local';
          const value = Utils.getCache(cacheKey, cacheType) || v.default;
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

  // 清空缓存数据
  @action
  _clearStore() {
    if (this._cacheList) {
      this._cacheList.forEach(item => {
        Utils.setCache(item.cacheKey || item.key, item.default, item.type)
      })
    }
  }
}

export default StoreEnhancer;