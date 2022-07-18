import Vue from 'vue'

/**
 *@description 生成树形菜单
 *@param {url} String
 *@return {}
 */
export function genarateRoutes(data, menuList) {
  data.forEach((item, index) => {
    menuList.push({
      path: item.routePath,
      name: item.routeName,
      // types: item.types,
      hidden: item.hidden === 'true' ? true : false,
      // component:
      //   item.component === 'Layout'
      //     ? Layout
      //     : (resolve) => require([`@/views/${item.component}.vue`], resolve),
      component: (resolve) =>
        require([`@/views/${item.component}.vue`], resolve),
      // meta: {
      //   title: item.meta.title,
      //   icon: item.meta.icon,
      //   // 用来存放按钮权限
      //   button: item.meta.button,
      // },
      // //  redirect: item.redirect,
      // id: item.id,
      // 子路由
      children: [],
    })
    // 生成子菜单
    if (item.children) {
      const childArr = genarateRoutes(item.children, [])
      menuList[index].children = childArr
    }
  })
  return menuList
}
/**
 *@description 获取地址栏参数，转换成对象
 *@param {url} String
 *@return {}
 */
function getQueryObject(url) {
  // const obj1 = new URLSearchParams("?companyId=32&storeId=3129");
  // console.log(obj1.get("companyId")); //32

  // url为http://www.baidu.com?name=1
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  // console.log(search)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    // console.log(rs, $1, $2) // name=1 name 1
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    // val = String(val)
    obj[name] = String(val)
    return rs
  })
  return obj
}

/**
 *@description 下载文件，并设置文件名
 *@param {url} String
 *@param {params} Object
 *@param {fileName} String
 *@return {}
 */
function downloadFile(url, params, fileName) {
  // const params = this.getParams()
  this.fileRequest({
    // url: '/exportPythonFile',
    url,
    method: 'post',
    data: params,
    responseType: 'blob',
  }).then((res) => {
    // 1.生成文件下载链接
    let binaryData = []
    binaryData.push(res)
    // const url = window.URL.createObjectURL(res);
    let url = window.URL.createObjectURL(new Blob(binaryData))
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    // 2.获取文件名
    let fileName2 = fileName
    let disposition = res.headers['content-disposition']
    // 存在该响应头
    if (disposition) {
      fileName2 = disposition.split('attachment;filename=')[1]
    }
    a.download = fileName2 // 文件名称
    // a.download = 'ruleCollections.py' // 文件名称
    // 下载文件
    a.click()
    window.URL.revokeObjectURL(url) // 浏览器会自动释放createObjectURL创建的对象
  })
}
/**
 *@description 格式化日期
 *@param {dateTime} Object
 *@return {}
 */
function formatDateTime(dateTime) {
  // 使用Date的属性方法，分别取得年，月，日，时，分，秒
  let year = dateTime.getFullYear()
  // 注意取得的月份为0-11，所以要加1
  let month =
    dateTime.getMonth() + 1 < 10
      ? '0' + (dateTime.getMonth() + 1)
      : dateTime.getMonth() + 1
  // 注意天的取得，是getDate()，而不是getDay()
  let day =
    dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate()
  let hour =
    dateTime.getHours() < 10 ? '0' + dateTime.getHours() : dateTime.getHours()
  let minute =
    dateTime.getMinutes() < 10
      ? '0' + dateTime.getMinutes()
      : dateTime.getMinutes()
  let second =
    dateTime.getSeconds() < 10
      ? '0' + dateTime.getSeconds()
      : dateTime.getSeconds()
  // 拼接年月日时分秒：yyyy-MM-dd HH:mm:ss
  let dateTime2 =
    year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  return dateTime2
}
function isLengthZero(Arr) {
  return !Arr || Arr.length <= 0
}
function generateUUID() {
  var d = new Date().getTime()

  if (window.performance && typeof window.performance.now === 'function') {
    d += window.performance.now() // use high-precision timer if available
    // performance.now()精确点高，不依靠系统时间，但是兼容性有问题。
    // Date.now()会受系统时间影响，且以Unix时间为基准，不易看懂，无兼容性问题。
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[x,y]/g,
    function (c) {
      var r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
    }
  )
  return uuid
}
const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`
    const node = document.querySelector(element)

    node.classList.add(`${prefix}animated`, animationName)

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation()
      node.classList.remove(`${prefix}animated`, animationName)
      resolve('Animation ended')
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true })
  })

Vue.prototype.$getQueryObject = getQueryObject
Vue.prototype.$downloadFile = downloadFile
Vue.prototype.$formatDateTime = formatDateTime
Vue.prototype.$isLengthZero = isLengthZero
Vue.prototype.$generateUUID = generateUUID
Vue.prototype.$animateCSS = animateCSS
