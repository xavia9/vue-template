<template>
  <div class="page-bar">
    <div class="chart-bar" ref="barChart"></div>
    <div class="chart-bar" ref="barChart2" style="display:none"></div>
  </div>
</template>

<script>
import { barChartOption } from '@/components/widgets/quickCharts/index.js'
// const echarts = require('echarts')
export default {
  data() {
    return {
      file: {}, //柱状图文件对象
    }
  },
  mounted() {
    this.initBarChart()
  },
  methods: {
    initBarChart() {
      let options = barChartOption({
        title: '这是柱状图',
        gridTop: '2%',
        legendList: [
          {
            name: '完成事项数',
            icon: 'roundRect',
          },
        ],
        units: ['件', '件', '%'],
        xAxisData: ['银行', '租赁', '金融', '证券', '寿险', '理财'],
        seriesData: [102, 129, 271, 534, 470, 350],
      })
      const barChart = echarts.init(this.$refs.barChart)
      options = {
        ...options,
        title: [
          {
            text: '平均评级调整时长分布情况',
            top: '10',
            left: '10',
            textStyle: {
              fontSize: 14,
              color: '#333',
              fontWeight: 'bold',
            },
          },
        ],
        // legend: {
        //   // type: 'scroll', //'plain' | 'scroll'
        //   show: true,
        //   backgroundColor: '#ccc',
        //   textStyle: {
        //     color: '#ccc',
        //   },
        //   // orient: 'horizontal', //可选'vertical' | 'horizontal'
        //   data: [
        //     '完成事项数',
        //     '完成事项数',
        //     // {
        //     //   name: '完成事项数',
        //     //   icon: 'roundRect',
        //     // },
        //     // {
        //     //   name: '发起+关联事项总数',
        //     //   icon: 'roundRect',
        //     // },
        //     // {
        //     //   name: '完成事项数',
        //     //   icon: 'line',
        //     // },
        //   ],
        //   itemWidth: 20, //图例图形宽度
        //   itemHeight: 12, //图例图形高度
        // },
      }
      //绘制图表
      barChart.setOption(options, true)
      barChart.on('finished', () => {
        // if (!showLabel) return
        // this.file = this.$dataURLtoFile(barChart.getDataURL(), '')
      })
    },
  },
}
</script>

<style>
.page-bar {
}
.chart-bar {
  width: 98%;
  height: 500px;
  margin: 0 auto;
}
</style>
