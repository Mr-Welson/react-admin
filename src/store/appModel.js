import { observable, action } from 'mobx'

class AppModel {

  // 主题 light/dark
  @observable theme = 'dark'
  @observable loading = false;
  @observable disableMobile = false;
  
  @action
  setTheme = (theme) => {
    this.theme = theme
  } 
  
  @action
  setLoading = (loading) => {
    this.loading = loading
  } 
}

export default new AppModel()