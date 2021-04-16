import { INCREMENT, DECREMENT } from '../constart';

// 同步action  action的值为obj
export const increment = (data) => ({ type: INCREMENT, data });
export const decrement = (data) => ({ type: DECREMENT, data });

// 异步action  action的值为函数 异步action中一般都会调用同步action
export const incrementAsync = (data, time) => {
      return (dispatch) => {
            setTimeout(() => {
                  dispatch(increment(data));
            }, time);
      };
};