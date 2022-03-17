<template>
  <div>
    <el-button-group>
      <el-button
        v-for="(btn, index) in btnGroup"
        :key="index"
        :class="{ active: btn.disabled }"
        @click="change(index)"
        >{{ btn.name }}
      </el-button>
    </el-button-group>
    <div>
      <component :is="currentCom"></component>
    </div>
    <br/>
    <!-- 按照数组顺序展示组件列表 -->
    <h3></h3>
    <div v-for="(item,index) in newsComp" :key="item.id">
      <component :is="item.type"></component>
    </div>
  </div>
</template>
<script>
import Childs1 from '@/components/skills/Childs1'
import Childs2 from '@/components/skills/Childs2'
import Childs3 from '@/components/skills/Childs3'
import Childs4 from '@/components/skills/Childs4'


export default {
  name: 'dynamic',
  components: {
    Childs1,
    Childs2,
    Childs3,
    Childs4,
  },
  data() {
    return {
      btnGroup: [
        { name: 'Childs1', disabled: true },
        { name: 'Childs2', disabled: false },
        { name: 'Childs3', disabled: false },
        { name: 'Childs4', disabled: false },
      ],
      currentCom: 'Childs1',
      newsComp: [
        { type: 'Childs1', id: '1' },
        { type: 'Childs2', id: '2' },
        { type: 'Childs1', id: '3' },
        { type: 'Childs4', id: '4' },
      ],
    }
  },
  methods: {
    change(index) {
      // 取出点击的上一个组件名的最后一个字符，并转化为数字【！！】
      let pre = Number(this.currentCom[this.currentCom.length -1]);
      // 取出字符串的最后一个字符【！！】
      console.log(Number(this.currentCom[this.currentCom.length -1]));
      console.log(index);
      // 点击第一个按钮时先设置为false再设置为true
      this.btnGroup[pre-1].disabled = false
      this.btnGroup[index].disabled = true
      this.currentCom = 'Childs' + (index+1)
    },
    // newsCompType(){
    //   return this.newsComp.map((item)=>{
    //     return {
    //       ...item,
    //       type:'news-' + item.type,
    //     }
    //   })
    // }
  },
  computed:{
  },
  mounted(){
    // console.log(this.newsCompType());
  }
}
</script>
<style scoped>
.active{
  /* 样式不生效时可以增加权重试试 */
  background-color: red!important;
}
</style>
