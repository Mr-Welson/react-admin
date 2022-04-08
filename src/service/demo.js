import { HttpRequest } from './request';
import { mockApi } from './config';

const URL = {
  login: `${mockApi}/sysLogin.json`,
};

class DemoService extends HttpRequest {
  fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([111, false]);
      }, 300);
    });
  }
}

export default new DemoService();
