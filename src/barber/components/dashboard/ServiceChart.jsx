import React from 'react';
import ReactECharts from 'echarts-for-react';

const option = {
  title: {
    text: 'Service Distribution',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: 'Services',
      type: 'pie',
      radius: ['40%', '70%'], 
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '20',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: 'Hair Cut' },
        { value: 735, name: 'Shaving' },
        { value: 580, name: 'Hair Color' },
        { value: 484, name: 'Facial' },
        { value: 300, name: 'Manicure' },
      ],
    },
  ],
};

const ServiceChart = () => (
  <div style={{ width: '100%', height: '400px' }}>
    <ReactECharts option={option} style={{ width: '100%', height: '100%' }} />
  </div>
);

export default ServiceChart;