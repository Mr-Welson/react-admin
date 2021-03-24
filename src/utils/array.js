/**
 * 以递归的方式展平react router数组
 * @param {object[]} arr 路由数组
 * @param {string} child 需要递归的字段名
 */
export const flattenRoutes = (arr) =>
  arr.reduce((prev, item = { routes: {} }) => {
    if (Array.isArray(item.routes)) {
      prev.push(item)
    }
    return prev.concat(
      Array.isArray(item.routes) ? flattenRoutes(item.routes) : item
    )
  }, [])

  