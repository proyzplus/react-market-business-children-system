import React, { Component } from 'react';
import { DatePicker } from 'antd';
import './indexs.less';

const { RangePicker } = DatePicker;

export default class index extends Component {
  state = {
    begin_time: "",
    end_time: ""
  }
  changeTime = val => {
    let beginTime = this.$moment(val[0]).format("YYYY-MM-DD HH:mm:ss");
    let endTime = this.$moment(val[1]).format("YYYY-MM-DD HH:mm:ss");
    console.log(beginTime, endTime, "time");
  }
  render() {
    return (
      <div className="screenPage">
        <div className="selectTime">
          <RangePicker onChange={this.changeTime} defaultValue={[this.$moment(new Date(), 'YYYY-MM-DD'), this.$moment(new Date(), 'YYYY-MM-DD')]} showToday locale={this.$locale} />
        </div>
      </div>
    )
  }
}