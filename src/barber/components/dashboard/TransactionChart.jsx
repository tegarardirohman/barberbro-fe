import React from 'react';
import ReactECharts from 'echarts-for-react';




const TransactionChart = ({ option }) => (
  <div style={{ width: '100%', height: '100%' }}>
    <ReactECharts option={option} style={{ width: '100%', height: '100%' }} />
  </div>
);

export default TransactionChart;
