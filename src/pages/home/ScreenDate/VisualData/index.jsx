import React, { Component } from 'react';
import screenData1 from '../../../../aseets/image/home/screenData/9.png';
import screenData2 from '../../../../aseets/image/home/screenData/8.png';
import screenData3 from "../../../../aseets/image/home/screenData/7.png";
import screenData4 from "../../../../aseets/image/home/screenData/3.png";
import screenData5 from "../../../../aseets/image/home/screenData/11.png";
import screenData6 from "../../../../aseets/image/home/screenData/14.png";
import screenData7 from "../../../../aseets/image/home/screenData/12.png";
import screenData8 from "../../../../aseets/image/home/screenData/13.png";
import "./index.less";

export default class index extends Component {
  render() {
    const { summary } = this.props;
    return (
      <div className="VisualData">
        <div className="home_tablist">
          <div className="tab_count">
            <div className="tab_list">
              <p>收入总数</p>
              <div className="icon_word">
                <img src={screenData1} alt="error" />
                <span style={{ color: "#ff6900" }}>{summary.true_price == 0 ? "0.00" : summary.true_price}</span>
              </div>
            </div>
            <div className="tab_list">
              <p>退款、退货</p>
              <p className="icon_word">
                <img src={screenData2} alt="" />
                <span>{summary.refund_price == 0 ? "0.00" : summary.refund_price} / {summary.refund_count == 0 ? "0.00" : summary.refund_count}</span>
              </p>
            </div>
          </div>
          <div className="tab_count">
            <div className="tab_list">
              <p>
                营销收入
              <span style={{ fontSize: "14px", color: "rgba(144,147,153,1)" }}>（收入-退款）</span>
              </p>
              <div className="icon_word">
                <img src={screenData3} alt="" />
                <span>{summary.sale_price == 0 ? "0.00" : summary.sale_price}</span>
              </div>
            </div>
            <div className="tab_list">
              <p>
                利润
              <span style={{ fontSize: "14px", color: "rgba(144,147,153,1)" }}>（营销-成本）</span>
              </p>
              <p className="icon_word">
                <img src={screenData4} alt="" />
                <span>{Number(summary.sale_price) - Number(summary.discount_price) == 0 ? '0.00' : Number(summary.sale_price) - Number(summary.discount_price)}</span>
              </p>
            </div>
          </div>
          <div className="tab_count">
            <div className="tab_list">
              <p>充值收入</p>
              <div className="icon_word">
                <img src={screenData5} alt="" />
                <span>{summary.pay_discard == 0 ? "0.00" : summary.pay_discard}</span>
              </div>
            </div>
            <div className="tab_list">
              <p>赠送金额</p>
              <p className="icon_word">
                <img src={screenData6} alt="" />
                <span>{summary.discount_price == 0 ? "0.00" : summary.discount_price}</span>
              </p>
            </div>
          </div>
          <div className="tab_count" style={{ border: "0px" }}>
            <div className="tab_list">
              <p>客流量</p>
              <div className="icon_word">
                <img src={screenData7} alt="" />
                <span>{summary.sale_count}</span>
              </div>
            </div>
            <div className="tab_list">
              <p>
                客单价
              <span style={{ fontSize: "14px", color: "rgba(144,147,153,1)" }}>(总收入/订单数）</span>
              </p>
              <p className="icon_word">
                <img src={screenData8} alt="" />
                <span>{summary.sale_count == 0 ? "0.00" : (Number(summary.sale_price) / Number(summary.sale_count)).toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
