import { toJS as tojs } from 'mobx'
import { inject, observer } from 'mobx-react'


export const withModel = (Component, ...models) => {
  return inject(...models)(observer(Component))
}

export const toJS = tojs;