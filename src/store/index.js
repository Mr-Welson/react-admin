import userModel from './userModel'
import tabModel from './tabModel'
import appModel from './appModel'
import { toJS as tojs } from 'mobx'
import { inject, observer } from 'mobx-react'


export const withModel = (Component, ...models) => {
  return inject(...models)(observer(Component))
}

export const toJS = tojs;

const store = {
  userModel,
  tabModel,
  appModel,
}

export default store