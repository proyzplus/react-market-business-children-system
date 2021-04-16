import { UPDATEUSERINFO } from '../constart';

const initState = { id: null, name: "", jwt: null }
export default function userInfoReducer(preState = initState, action) {
      const { type, data } = action;
      switch (type) {
            case UPDATEUSERINFO: 
                  return data;
            default:
                  return preState;
      }
}