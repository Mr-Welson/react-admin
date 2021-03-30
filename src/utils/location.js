import { matchPath } from 'react-router-dom';

export const matchPathRoutes = (pathname, flatRoutes) => {
  const matchRoutes = flatRoutes.filter(v => {
    const matchInfo = matchPath(pathname, {
      path: v.path,
      exact: v.exact,
      strict: v.strict
    });
    return matchInfo
  })
  return matchRoutes
}

/**
 * 处理location.search的方法,将字符串转换成json
 * @param {string} search
 */
export function queryToObject(search = "") {
  let params = {};
  if (typeof search === "string" && search !== "") {
    search = search.indexOf("?") < 0 ? search : search.substr(search.indexOf("?") + 1);
    let a = search.split("&");
    let b = a.map(v => v.split("="));
    b.map(v => (params[v[0]] = v[1]));
  }
  return params;
}

/**
 * @desc 将对象转化为 & 连接符拼接
 * @params obj 需要转化的对像
 * @params strict 严格模式将包含值为 undefined 的属性
 */
export function objectToQuery(object, strict = true) {
  let arr = [];
  for (let key in object) {
    let value = object[key];
    if (value === undefined && !strict) {
      continue
    }
    arr.push(`${key}=${value}`)
  }
  return arr.join('&');
}

// 编码解码 url 地址（地址若包含'&'符，会导致参数解析出错）
export function escapeUrl(url, isEscape = true) {
  return isEscape ? escape(url) : unescape(url);
}

const regCros = new RegExp(`^${window.location.origin}`);
export function crosCheck(path) {
  return regCros.test(path);
}

