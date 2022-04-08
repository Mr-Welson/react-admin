import { HttpRequest } from './request';
import { pageRoutes } from '@/routes'
import { mockApi } from "./config";

const URL = {
  login: `${mockApi}/sysLogin.json`,
  getUserPermissionByToken: `${mockApi}/getUserPermissions.json`,
}

class UserService extends HttpRequest {

  systemConfig() {
    return this.$http({
      url: `${process.env.PUBLIC_URL}/config/systemConfig.json?${Date.now()}`,
    })
  }

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
        resolve([[pageRoutes], false])
      }, 300)
    })
  }
}

export default new UserService()