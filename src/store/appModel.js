import { observable, action } from 'mobx'

class AppModel {

  // 主题 light/dark
  @observable theme = 'dark'


  @action
  setTheme = (theme) => {
    this.theme = theme
  }
}

export default new AppModel()