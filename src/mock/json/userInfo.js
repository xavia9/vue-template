const Mock = require('mockjs') // 导入依赖模块

// const userJson = {
//   id: '@id()', // 得到随机的id
//   username: '@cname()', // 随机生成中文名字
//   date: '@date()', // 随机生成日期
//   avatar: "@image('200x200','red','#fff','avatar')", // 生成图片
//   description: '@paragraph()', // 描述
//   ip: '@ip()', // ip地址
//   email: '@email()', // email
// }
const userInfo = Mock.mock({
  id: '@id()', // 得到随机的id
  username: '@cname()', // 随机生成中文名字
  date: '@date()', // 随机生成日期
  avatar: "@image('200x200','red','#fff','avatar')", // 生成图片
  description: '@paragraph()', // 描述
  ip: '@ip()', // ip地址
  email: '@email()', // email
})

module.exports = { userInfo }
