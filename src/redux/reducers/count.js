/**
 * 为count服务的reducer 本质就是一个函数
 * reducer函数会接到两个参数 之前状态与动作对象
 */
import { INCREMENT, DECREMENT } from '../constart';

const initState = 0;
export default function countReducer(preState = initState, action) {
      const { type, data } = action;
      switch (type) {
            case INCREMENT: //加
                  return preState * 1 + data * 1;
            case DECREMENT: //减
                  return preState * 1 - data * 1;
            default:
                  return preState;
      }
}
