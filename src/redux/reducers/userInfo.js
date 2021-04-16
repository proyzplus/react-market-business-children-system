import { UPDATEUSERINFO } from '../constart';

var initState = { id: null, name: "", jwt: null };
const userInfoReducer = (preState = initState, action) => {
      const { type, data } = action;
      switch (type) {
            case UPDATEUSERINFO:
                  return data;
            default:
                  return preState;
      }
}
export default userInfoReducer;