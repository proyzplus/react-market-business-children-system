import React, { Component } from 'react';

import ReactEcharts from 'echarts-for-react';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import "./index.less";

export default class index extends Component {
  getOtion = () => {
    const rCharge = Math.max(...this.props.memberCharge);
    const Regist = Math.max(...this.props.memberRegist);
    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      legend: {
        data: ["充值额", "注册数"],
        x: "center"
      },
      xAxis: [
        {
          type: "category",
          name: "日期",
          data: this.props.xAxisData,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          name: " "
        }
      ],
      series: [
        {
          name: "充值额",
          type: "bar",
          color: "#FAD961",
          barWidth: "15%",
          data: this.props.memberCharge
        },
        {
          name: "注册数",
          type: "bar",
          color: "#ff6900",
          barWidth: "15%",
          data: this.props.memberRegist
        }
      ]
    };
    return option;
  }
  render() {
    return (
      <div className="EchartData">
        <ReactEcharts option={this.getOtion()} style={{ height: '500px', width: '100%' }} />
      </div>
    )
  }
}
