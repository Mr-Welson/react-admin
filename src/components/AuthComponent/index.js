/**
 * @param {String|Array} authName 
 * @param {Boolean} matchAll false authName为数组时，决定全部匹配还是
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
      hasAuth = authName.every(v => authList.find(x => x.key === v))
    } else {
      hasAuth = !!authName.find(v => authList.find(x => x.key === v))
    }
  } else {
    hasAuth = !!authList.find(v => v.key === authName)
  }

  return hasAuth ? children : noAuthComponent
}

export default AuthComponent;