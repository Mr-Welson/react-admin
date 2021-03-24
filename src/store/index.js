import userModel from './userModel'
import tabModel from './tabModel'
import { toJS as tojs } from 'mobx'
import { inject, observer } from 'mobx-react'

const store = {
  userModel,
  tabModel,
}

export const withModel = (Component, ...models) => {
  return inject(...models)(observer(Component))
}

export const toJS = tojs

export default store