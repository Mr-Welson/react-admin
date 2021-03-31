import { HttpRequest } from './request';
import { pageRoutes } from '@/routes'

const baseUrl = '/mock';

const URL = {
  login: `${baseUrl}/sysLogin.json`,
  getUserPermissionByToken: `${baseUrl}/getUserPermissionByToken.json`,
}

class UserService extends HttpRequest {
  
  async login(data) {
    const response = await this.$http({
      url: URL.login,
      data
    })
    return this.$handleResponse(response)
  }

  async getUserPermissionByToken(data) {
    const response = await this.$http({
      url: URL.getUserPermissionByToken,
      data
    })
    return this.$handleResponse(response)
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