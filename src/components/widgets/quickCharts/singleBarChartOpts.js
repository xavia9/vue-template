export default function barChartOption(conditions) {
  const { title, gridTop, legendList, units, xAxisData, seriesData } = {
    ...conditions,
  }
  // 柱状图色值
  const colorList = [
    ['#5F8DFE', 'rgba(95,141,254,0.5)'],
    ['#25C6B9', 'rgba(95,141,254,0.5)'],
    ['#5F8DFE', 'rgba(95,141,254,0.5)'],
    ['#5F8DFE', 'rgba(95,141,254,0.3)'],
    ['#5F8DFE', 'rgba(95,141,254,0.3)'],
    ['#FE2525', 'rgba(254,187,37,0.5)'],
    ['#FE2525', 'rgba(254,187,37,0.5)'],
    ['#FE2525', 'rgba(254,187,37,0.5)'],
    ['#FE2525', 'rgba(254,187,37,0.3)'],
    ['#FE2525', 'rgba(254,187,37,0.3)'],
  ]
  // const getColor = (index) => {
  //   // 根据横轴柱子的数量自动生成颜色
  //   // let index = params.seriesIndex
  //   // 1, 0, 0, 0图例图形从左到右由浅变深
  //   return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
  //     {
  //       offset: 0,
  //       color: colorList[index][0],
  //     },
  //     {
  //       offset: 1,
  //       color: colorList[index][1],
  //     },
  //   ])
  // }
  // 生成options阶段
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none', // 默认为直线，可选"line" | "shadow"
        lineStyle: {
          axis: 'auto',
          type: 'dashed',
          width: 1,
          color: '#E8E8E8',
        },
      },
      extraCssText:
        'background-color:#fff;box-shadow:0 2px 16px 0 rgba(0,0,0,0.15);border-radius: 6px', //背景色及阴影
      formatter: (params) => {
        // let title = `<span style="font-size:14px;">${params[0].axisValueLabel}</span><br />`
        let circle = '',
          text = '',
          paragraph = ''
        const colors = ['#1f6bff', '#41d2d2', '#f46932']
        // const units = ['件', '件', '%']
        params.forEach((item, index) => {
          // color = colors[index]
          // unit = units[index]
          circle = `<span style="display: inline-block;width: 6px; height: 6px;margin-right: 5px;background-color:${colors[index]};border-radius: 3px;"></span>`
          // text = `<span style="font-size:12px;color:#666">${item.seriesName}</span>&nbsp<span style="font-size:14px;color:#333">${item.value}${units[index]}</span><br />`
          text = `<span style="font-size:12px;color:#666">${item.axisValue}</span>&nbsp<span style="font-size:14px;color:#333">${item.value}${units[index]}</span><br />`
          paragraph = paragraph + circle + text
        })
        // return title + paragraph
        return paragraph
      },
    },
    grid: {
      top: 80,
      width: '98%',
      height: '80%',
      left: '3%',
      right: '4%',
      bootom: 80,
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          formatter: (value) => {
            let res = value
            // 超出固定长度截取
            if (res.length > 5) {
              res = res.substring(0, 4) + '...'
            }
            return res
          },
        },
        boundaryGap: true,
      },
    ],
    yAxis: [
      {
        name: '', //y轴单位
        type: 'value',
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          interval: 0,
          textStyle: {
            color: '#242F57',
            fontSize: '12px',
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#EAEDF7',
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#eee',
          },
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['#FBFBFC', '#fff'],
          },
        },
      },
    ],
    series: [
      {
        type: 'bar',
        name: '完成事项数', //必须与legend中data的name对应
        barWidth: '20.33%',
        // barGap: '0%',
        barCategoryGap: '100%',
        data: seriesData,
        itemStyle: {
          normal: {
            barBorderRadius: [4, 4, 0, 0],
            label: {
              show: true,
              formatter: '{c}',
              position: 'top',
            },
            color: (params) => {
              // let colorList = [
              //   ['#5F8DFE', 'rgba(95,141,254,0.5)'],
              //   ['#5F8DFE', 'rgba(95,141,254,0.5)'],
              //   ['#5F8DFE', 'rgba(95,141,254,0.5)'],
              //   ['#5F8DFE', 'rgba(95,141,254,0.3)'],
              //   ['#5F8DFE', 'rgba(95,141,254,0.3)'],
              //   ['#FE2525', 'rgba(254,187,37,0.5)'],
              //   ['#FE2525', 'rgba(254,187,37,0.5)'],
              //   ['#FE2525', 'rgba(254,187,37,0.5)'],
              //   ['#FE2525', 'rgba(254,187,37,0.3)'],
              //   ['#FE2525', 'rgba(254,187,37,0.3)'],
              // ]
              // debugger
              // 根据横轴柱子的数量
              let index = params.seriesIndex
              return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: colorList[index][0],
                },
                {
                  offset: 1,
                  color: colorList[index][1],
                },
              ])
            },
          },
        },
      },
    ],
    legend: {
      // type: 'scroll', //'plain' | 'scroll'
      // orient: 'horizontal', //可选'vertical' | 'horizontal'
      // data: [
      //   {
      //     name: '完成事项数',
      //     icon: 'roundRect',
      //   },
      //   {
      //     name: '发起+关联事项总数',
      //     icon: 'roundRect',
      //   },
      //   {
      //     name: '完成事项数',
      //     icon: 'line',
      //   },
      // ],
      // backgroundColor: '#ccc',
      // textStyle: {
      //   color: '#ccc',
      // },
      top: '40',
      data: legendList,
      itemWidth: 20, //图例图形宽度
      itemHeight: 12, //图例图形高度
    },
    color: (params) => {
      // 根据横轴柱子的数量自动生成颜色
      let index = params.seriesIndex
      // 1, 0, 0, 0图例图形从左到右由浅变深
      return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
        {
          offset: 0,
          color: colorList[index][0],
        },
        {
          offset: 1,
          color: colorList[index][1],
        },
      ])
    },
    // color: (params) => {
    //   // 根据横轴柱子的数量自动生成颜色
    //   let index = params.seriesIndex
    //   getColor(index)
    // },
    backgroundColor: '#fff', //画布背景色
  }
}
