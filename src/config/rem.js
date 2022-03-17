// ;(function() {
//   function a() {
//     var b = document.documentElement.clientWidth
//     b = b > 750 ? 750 : b
//     var c = (b / 750) * 100
//     document.getElementsByTagName('html')[0].style.fontSize = c + 'px'
//   }
//   a()
//   window.onresize = a
// })()
const baseSize = 16
function setRem() {
  var scale = document.documentElement.clientWidth / 1920
  // 设置页面根节点字体大小，最高放大比例为2
  const fontSize = baseSize * Math.min(scale, 2)
  if (fontSize > 14) {
    document.documentElement.style.fontSize = fontSize + 'px'
  } else {
    // 最小字体大小为14px
    document.documentElement.style.fontSize = '14px'
  }
}
setRem()

window.onresize = function() {
  setRem()
}
