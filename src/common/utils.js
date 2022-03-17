/**
 * 获取地址栏参数，转换成对象
 *@param {url} String
 *@return {}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  // console.log(search)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    console.log(rs, $1, $2)
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * 下载文件，并设置文件名
 *@param {url} String
 *@param {params} Object
 *@return {}
 */
export function downloadFile(url, params) {
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
    let disposition = res.headers['content-disposition']
    let fileName = disposition.split('attachment;filename=')[1]
    a.download = fileName // 文件名称
    // a.download = 'ruleCollections.py' // 文件名称
    // 下载文件
    a.click()
    window.URL.revokeObjectURL(url) // 浏览器会自动释放createObjectURL创建的对象
  })
}
