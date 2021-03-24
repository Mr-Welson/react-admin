import { requestInstance } from './request';
import { pageRoutes } from '@/routes'

const baseUrl = 'mock';

const URL = {
  login: `${baseUrl}/sysLogin`,
  getUserPermissionByToken: `${baseUrl}/getUserPermissionByToken`,
}

@requestInstance
class UserService {

  login() {
    return this.$http({
      url: URL.login
    }).then(res => {
      return [res, null]
    }).catch(err => {
      return [undefined, err]
    })
  }

  getUserPermissionByToken() {
    return this.$http({
      url: URL.getUserPermissionByToken
    }).then(res => {
      return [res, null]
    }).catch(err => {
      return [undefined, err]
    })
  }

  getMenuList() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([pageRoutes, false])
      }, 300)
    })
  }
}

export default new UserService()