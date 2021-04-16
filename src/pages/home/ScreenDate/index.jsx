import React, { Component } from 'react';
import { DatePicker } from 'antd';
import VisualData from './VisualData';
import RankingData from './RankingData';
import EchartData from './EchartData';
import { subBusinessMain } from '../../../api/home';
import './indexs.less';

import { connect } from "react-redux";
import { updateUserInfo } from '../../../redux/actions/userInfo';

const { RangePicker } = DatePicker;

class Index extends Component {
  state = {
    begin_time: "",
    end_time: "",
    summary: {
      true_price: 0,
      refund_price: 0,
      refund_count: 0,
      sale_price: 0,
      discount_price: 0,
      pay_discard: 0,
      sale_count: 0
    },
    topCommod: [],
    topcommodProfit: [],
    xAxisData: [],
    memberCharge: [],
    memberRegist: []
  }
  changeTime = val => {
    let begin_time = this.$moment(val[0]).format("YYYY-MM-DD");
    let end_time = this.$moment(val[1]).format("YYYY-MM-DD HH:mm:ss");
    this.setState({
      begin_time, end_time
    });
  }
  componentDidMount = async () => {
    let data = {
      begin_time: this.state.begin_time ? this.state.begin_time : 1587047778000,
      end_time: this.state.end_time ? this.state.end_time : 1618416000000
    };
    let nowUser = sessionStorage.getItem("nowUser");
    await this.$localForage.getItem(nowUser + "userInfo").then(res => {
      if (res) {
        data.shop_id = res.bindShop.id;
      } else {
        data.shop_id = this.props.userInfo.bindShop.id;
      }
    });
    await subBusinessMain(data).then(res => {
      let newTopCommod = [];
      let topCommod = res.data.topCommod;
      topCommod.forEach((item, index) => {
        let hotCommodsPercentage = (item.sale_count / topCommod[0].sale_count) * 100;
        newTopCommod.push({
          num: index + 1,
          sale_count: parseInt(item.sale_count),
          name: item.commodname,
          percentage: Math.round(hotCommodsPercentage)
        });
      });
      let newTopcommodProfit = [];
      let topcommodProfit = res.data.topcommodProfit;
      topcommodProfit.forEach((item, index) => {
        let hotCommodsPercentage = (item.total / topcommodProfit[0].total) * 100;
        newTopcommodProfit.push({
          num: index + 101,
          sale_count: parseInt(item.total),
          name: item.name,
          percentage: Math.round(hotCommodsPercentage)
        });
      });
      let xAxisData = [];
      let memberCharge = [];
      let memberRegist = [];
      res.data.memberCharge.forEach(item => {
        xAxisData.push(this.$moment(item.date).format("YYYY-MM-DD"));
        memberCharge.push(Number(item.coalesce));
      });
      res.data.memberRegist.forEach(item => {
        memberRegist.push(Number(item.coalesce));
      });
      this.setState({
        summary: res.data.summary,
        topCommod: newTopCommod,
        topcommodProfit: newTopcommodProfit,
        xAxisData,
        memberCharge,
        memberRegist
      });
    });
  };
  render() {
    const { summary, topCommod, topcommodProfit, xAxisData, memberCharge, memberRegist } = this.state;
    return (
      <div className="screenPage">
        <div className="screenVisual">
          <RangePicker onChange={this.changeTime} defaultValue={[this.$moment(new Date(), 'YYYY-MM-DD'), this.$moment(new Date(), 'YYYY-MM-DD')]} showToday locale={this.$locale} />
          <VisualData summary={summary} />
          <RankingData topCommod={topCommod} topcommodProfit={topcommodProfit} />
        </div>
        <div className="screenVisual" style={{ marginTop: "16px" }}>
          <EchartData xAxisData={xAxisData} memberCharge={memberCharge} memberRegist={memberRegist} />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    userInfo: state.userInfo,
  }),
  {
    updateUserInfo
  }
)(Index)