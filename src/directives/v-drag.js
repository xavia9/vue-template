const vDrag = {
  //   el指令绑定的dom元素
  // inserted: function(el) {
  //     obj.onmousedown = function(event){
  //       obj.style.position = "absolute";
  //       obj.setCapture && obj.setCapture();
  //       event = event || window.event;
  //       var ol = event.clientX - obj.offsetLeft;
  //       var ot = event.clientY - obj.offsetTop;
  //       document.onmousemove = function(event){
  //         event = event || window.event;
  //         var left = event.clientX - ol;
  //         var top = event.clientY - ot;
  //         //修改box1的位置
  //         obj.style.left = left+"px";
  //         obj.style.top = top+"px";
  //       };
  //       //为document绑定一个鼠标松开事件
  //       document.onmouseup = function(){
  //         document.onmousemove = null;
  //         document.onmouseup = null;
  //         obj.releaseCapture && obj.releaseCapture();
  //       };
  //       return false;

  //     };
  //   }
  // },
  // }
  inserted(el, binding) {
    // 解决元素右移的bug
    el.style.position = 'absolute'
    console.log(window.document.body.offsetWidth)
    // console.log(window.document.body.clientWidth)
    // console.log(el.parentNode.offsetLeft)
    const minX = el.parentNode.offsetLeft
    const maxX = el.parentNode.offsetWidth - el.offsetWidth

    const minY = el.parentNode.offsetTop
    const maxY = el.parentNode.offsetHeight - el.offsetHeight

    const elWidth = el.offsetWidth
    const elHeight = el.offsetHeight

    //el的位置
    const setPosition = (left, top) => {
      el.style.left = left + 'px'
      el.style.top = top + 'px'
    }

    el.onmousedown = function (event) {
      // el.style.position = 'absolute'
      el.setCapture && el.setCapture()
      event = event || window.event
      const { clientX, clientY } = event
      const { offsetLeft, offsetTop } = el

      var leftWidth = clientX - offsetLeft
      var topHeight = clientY - offsetTop

      document.onmousemove = function (event) {
        event = event || window.event
        let left = event.clientX - leftWidth
        let top = event.clientY - topHeight

        // 设置top值
        const setTop = (top) => {
          if (top + topHeight < minY) {
            return 0
          } else if (top + elHeight > maxY) {
            return maxY
          }
          return top
        }
        // 设置top与left
        if (left + leftWidth < minX) {
          left = 0
          top = setTop()
        } else if (left + elWidth > maxX) {
          left = maxX
          top = setTop()
        } else {
          top = setTop()
        }
        setPosition(left, top)
      }

      //为document绑定一个鼠标松开事件
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        el.releaseCapture && el.releaseCapture()
      }
      return false
    }
  },
}
export default vDrag
