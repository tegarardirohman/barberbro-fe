import React from 'react';
import ReactECharts from 'echarts-for-react';

const option = {
  title: {
    text: 'Monthly Transactions',
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
    data: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
      data: [120, 200, 150, 80, 70, 110, 130],
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


const TransactionChart = () => (
  <div style={{ width: '100%', height: '100%' }}>
    <ReactECharts option={option} style={{ width: '100%', height: '100%' }} />
  </div>
);

export default TransactionChart;
