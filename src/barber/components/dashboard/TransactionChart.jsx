import React from 'react';
import ReactECharts from 'echarts-for-react';


const TransactionChart = ({ title, label, value }) => {


const option = {
  title: {
    text: title || 'Transaction Chart',
  },
  tooltip: {},
  legend: {
    data: ['Hair Cut'],
  },
  grid: {
    left: '1%',
    right: '0%',
    bottom: '0%',
    top: '16%',
    containLabel: true,
  },  
  xAxis: {
    type: 'category',
    data: label || [],
    axisLabel: {
      fontSize: 12,
    },
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      fontSize: 12,
    },
  },
  series: [
    {
      name: 'Transaction',
      type: 'bar',
      data: value || [],
      lineStyle: {
        width: 2,
      },
    //   areaStyle: {},
      smooth: true,
      itemStyle: {
        color: '#6C5DD3',
      },
    },
  ],
};



  return (

  <div style={{ width: '100%', height: '100%' }}>
    <ReactECharts option={option} style={{ width: '100%', height: '100%' }} />
  </div>


  )



};

export default TransactionChart;
