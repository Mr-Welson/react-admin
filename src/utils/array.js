/**
 * 以递归的方式展平react router数组
 * @param {object[]} arr 路由数组
 * @param {string} child 需要递归的字段名
 */
export const flattenRoutes = (arr, childKey = 'routes') => (
  arr.reduce((prev, item = { [childKey]: {} }) => {
    if (Array.isArray(item[childKey])) {
      prev.push(item)
    }
    return prev.concat(
      Array.isArray(item[childKey]) ? flattenRoutes(item[childKey], childKey) : item
    )
  }, [])
)


