import { ADDPERSON } from '../constart';

const initState = [{ id: 1, name: 'tom', age: 18 }]
export default function personReducer(preState = initState, action) {
      const { type, data } = action;
      switch (type) {
            case ADDPERSON:
                  // preState.unshift(data) 不能这么写  只能写纯函数
                  return [data, ...preState];
            default:
                  return preState;
      }
}