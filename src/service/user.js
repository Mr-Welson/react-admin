
class UserService {

  login() {
    return fetch('/api/sysLogin').then(res => res.json()).then(res => {
      return [res, null]
    }).catch(err => {
      return [undefined, err]
    })
  }

  getUserPermissionByToken() {
    return fetch('/api/getUserPermissionByToken').then(res => res.json()).then(res => {
      return [res, null]
    }).catch(err => {
      return [undefined, err]
    })
  }
}

export default new UserService()