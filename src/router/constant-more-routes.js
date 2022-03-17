// const routerList = []
// function importAll(r) {
//   r.keys().forEach((element) => {
//     routerList.push(r(element).default)
//   })
// }
// // importAll(require.context('./', true, /\.module\.js/))
// importAll(require.context('./', true, /page\.js/))
// console.log(routerList)
// export default routerList

// false 不递归处理子目录
const modulesFiles = require.context('./more-routes', false, /\.js$/)
// console.log(modulesFiles.keys()) // ['./page.js']

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // debugger
  const value = modulesFiles(modulePath)

  modules.routes = modules.routes || []
  modules.routes = [...modules.routes, ...value.default]
  return modules
}, {})
// console.log(modules)
export default [...modules.routes]
