/**
 * @param {String|Array} authName 
 * @param {Boolean} matchAll false authName为数组时，决定全部匹配还是
 * @param {noAuthComponent} isUnion 权限校验为 false 时，渲染的组件，默认为 null
 */

const authList = [];
const AuthComponent = ({
  authName,
  matchAll,
  children,
  noAuthComponent = null
}) => {

  let hasAuth;
  if (Array.isArray(authName)) {
    if (matchAll) {
      hasAuth = authName.every(v => authList.find(x => x.name === v))
    } else {
      hasAuth = !!authName.find(v => authList.find(x => x.name === v))
    }
  } else {
    hasAuth = !!authList.find(v => v.name === authName)
  }

  return hasAuth ? children : noAuthComponent
}

export default AuthComponent;