import request from '../utils/request';

/**
 * 首页大屏数据
 */
export function subBusinessMain(data) {
      return request.get(process.env.REACT_APP_URL2 + 'report/subBusinessMain', {
            params: data
      })
}