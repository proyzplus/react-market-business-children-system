import React, { Component } from 'react';
import { Tooltip } from 'antd';
import { Progress } from 'antd';
import './index.less';
import Item from 'antd/lib/list/Item';

export default class index extends Component {
  render() {
    const { topCommod, topcommodProfit } = this.props;
    return (
      <div className="RankingData">
        <div className="chart_details">
          <div className="chart_details_main">
            <div className="main_top_left">
              <p className="titleTop">Top 10</p>
              <p style={{ lineHeight: '0px', fontSize: "25px" }}>销量排行榜</p>
              <p className="shopTop" >根据本店销量商品排序</p>
            </div>
            <div style={{ width: "80%" }} >
              {
                topCommod.map(item => {
                  return (
                    <div className="details_top" key={item.id}>
                      <div className="top_left">
                        <div>
                          <Tooltip placement="top" title={item.name}>
                            <span>{item.name}</span>
                          </Tooltip>
                          <Progress percent={item.percentage} style={{ width: "98%", height: "36px", paddingTop: '28px' }} strokeColor={{ '0%': '#FAD961', '100%': '#ff6900' }} showInfo={false} />
                        </div>
                      </div>
                      <div className="top_right" style={{ width: "5%" }}>
                        <span style={{ lineHeight: "58px", marginLeft: '-40px', fontWeight: "600" }}>{item.sale_count}</span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="chart_details_main" style={{ marginLeft: '8px' }}>
            <div className="main_top_right">
              <p className="titleTop">Top 10</p>
              <p style={{ lineHeight: '0px', fontSize: "25px" }}>利润排行榜</p>
              <p className="shopTop">根据销售商品利润排序</p>
            </div>
            <div style={{ width: "80%" }} >
              {
                topcommodProfit.map(item1 => {
                  return (
                    <div className="details_top" key={item1.id}>
                      <div className="top_left">
                        <div>
                          <Tooltip placement="top" title={item1.name}>
                            <span>{item1.name}</span>
                          </Tooltip>
                          <Progress percent={item1.percentage} style={{ width: "98%", height: "36px", paddingTop: '28px' }} strokeColor={{ '0%': '#FAD961', '100%': '#ff6900' }} showInfo={false} />
                        </div>
                      </div>
                      <div className="top_right" style={{ width: "5%" }}>
                        <span style={{ lineHeight: "58px", marginLeft: '-40px', fontWeight: "600" }}>￥{item1.sale_count}</span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
