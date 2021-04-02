import { HttpRequest } from './request';

const baseUrl = '/mock';

const URL = {
  login: `${baseUrl}/sysLogin.json`,
  getUserPermissionByToken: `${baseUrl}/getUserPermissionByToken.json`,
}

class DemoService extends HttpRequest {

  fetchData() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([111, false])
      }, 300)
    })
  }
}

export default new DemoService()