<template>
  <div>
    <date-time-comp
      :start_date="start_date"
      :end_date="end_date"
      :config="config"
      @datetimeselected="handleTime"
    ></date-time-comp>
  </div>
</template>
<script>
import DateTimeComp from '@/components/element/DateTimeComp.vue'

export default {
  name: 'dateTimePage',
  components: { DateTimeComp },
  data() {
    return {
      // 自己传入开始结束时间
      start_date: '',
      end_date: '',
      config: {
        // 设置日期格式
        type: 'daterange',
        format: 'yyyy 年 MM 月 dd 日',
        valueFormat: 'yyyy-MM-dd HH:mm:ss',
      },
    }
  },
  methods: {
    handleTime({ datetime }) {
      console.log(datetime)
      if (datetime) {
        //子组件选择后返回的开始时间
        this.start_date = datetime[0]
        //子组件选择后返回的结束时间
        this.end_date = datetime[1]

        var ddd = new Date(this.start_date)
        console.log(+ddd.getMonth() + 1)
        console.log(ddd.getDate())
        var eee = new Date(this.end_date)
        console.log(+eee.getMonth() + 1)
        console.log(eee.getDate())
      } else {
        end_date = ''
        end_date = ''
      }
    },
  },
}
</script>
