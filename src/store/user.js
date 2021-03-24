import { observable, action } from 'mobx'

/* eslint-disable */

class User {
  // @observable isLogin = !!isAuthenticated()  //利用cookie来判断用户是否登录，避免刷新页面后登录状态丢失
  @observable isLogin = false  //利用cookie来判断用户是否登录，避免刷新页面后登录状态丢失

  @observable users = []  //模拟用户数据库

  @observable loginUser = {}  //当前登录用户信息

  @action 
  setIsLogin(isLogin) {
    this.isLogin = isLogin  //设置登录用户信息
  }

  @action initUsers() {

    if(true) return false

    const localUsers = localStorage['users'] ? JSON.parse(localStorage['users']) : []
    this.users = [{ username: 'admin', password: 'admin' }, ...localUsers]
  }

}

export default new User()