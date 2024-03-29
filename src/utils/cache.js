import Cookie from 'js-cookie';

function getStorageKey(key) {
  return `RA_${key}`;
}
/**
 * 获取缓存数据
 * @param {string} key
 * @param {string} type: 缓存类型 'local'(默认) / cookie / session;
 */
export function getCache(key, type = 'local') {
  let data;
  switch (type) {
    case 'cookie':
      data = Cookie.get(getStorageKey(key));
      break;
    case 'session':
      let strS = sessionStorage.getItem(getStorageKey(key));
      try {
        data = JSON.parse(strS);
      } catch (e) {
        data = strS;
      }
      break;
    default:
      let strL = localStorage.getItem(getStorageKey(key));
      try {
        data = JSON.parse(strL);
      } catch (e) {
        data = strL;
      }
      break;
  }
  return data;
}

/**
 * 设置缓存数据
 * @param {string} key
 * @param {any} value
 * @param {string} type: 缓存类型 'local'(默认) / cookie / session;
 */
export function setCache(key, value, type = 'local') {
  switch (type) {
    case 'cookie':
      Cookie.set(getStorageKey(key), value, { expires: 7 });
      break;
    case 'session':
      sessionStorage.setItem(getStorageKey(key), JSON.stringify(value));
      break;
    default:
      localStorage.setItem(getStorageKey(key), JSON.stringify(value));
      break;
  }
}

/**
 * 缓存设置，做限制处理
 * @param {string} key
 * @param {string} value
 * @param {function} limitErrorAction
 */
export function setStorage(key, value, limitErrorAction) {
  try {
    localStorage.setItem(getStorageKey(key), value);
  } catch (oException) {
    console.error(oException);
    if (oException.name === 'QuotaExceededError') {
      console.log('超出本地存储限额！');
      //如果历史信息不重要了，可清空后再设置
      // const keys = Object.getOwnPropertyNames(localStorage);
      // keys.map(key => {
      //   if (key.indexOf('_AMap') > -1) {
      //     localStorage.removeItem(key);
      //   }
      // });
      limitErrorAction && limitErrorAction();
    }
  }
}
