// // 导入mockjs
// const Mock = require('mockjs')
// // 获取 mock.Random 对象
// const Random = Mock.Random

// // mock新闻数据，包括新闻标题title、内容content、创建时间createdTime
// function produceNewsData(ops) {
//   console.log(opts)
//   let newsList = []
//   for (let i = 0; i < 20; i++) {
//     let newNewsObject = {
//       id: '@id()',
//       //  Random.ctitle( min, max) 随机产生一个中文标题，长度默认在3-7之间
//       title: Random.ctitle(),
//       // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
//       content: Random.cparagraph(),
//       // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd
//       createdTime: Random.date(),
//     }
//     newsList.push(newNewsObject)
//   }
//   // console.log(newsList)
//   return newsList
// }

// // 拦截该url，就可以返回newsList
// Mock.mock('/mock/news', 'POST', produceNewsData)

// const Mock = require('mockjs') // 导入依赖模块
const userInfo = require('./json/userInfo')
// const menuInfo = require('./json/menuInfo')
// 返回一个函数
module.exports = function (app) {
  // 监听 http 请求
  app.post('/user/userinfo', function (rep, res) {
    // 设置要返回的数据
    // let json = {
    //   id: '@id()', // 得到随机的id
    //   username: '@cname()', // 随机生成中文名字
    //   date: '@date()', // 随机生成日期
    //   avatar: "@image('200x200','red','#fff','avatar')", // 生成图片
    //   description: '@paragraph()', // 描述
    //   ip: '@ip()', // ip地址
    //   email: '@email()', // email
    // }
    res.json(userInfo)
  })
}
