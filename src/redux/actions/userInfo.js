import { UPDATEUSERINFO } from '../constart';

export const updateUserInfo = (userObj) => ({ type: UPDATEUSERINFO, data: userObj });