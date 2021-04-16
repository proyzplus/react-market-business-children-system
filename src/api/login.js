import request from '../utils/request';

/**
 * 登陆
 */
export function login(data) {
      const data2 = {
            name: data.user,
            password: data.pass
      };
      return Promise.all([request.post('/web/login', data), request.post(process.env.REACT_APP_URL2 + "loginCompany", data2)]).then(([_login, _loginCompany]) => {
            if (_login.code === 200 && _loginCompany.code === 200) {
                  const userInfo = Object.assign(_login.content, _loginCompany.data);
                  return userInfo;
            }
      });
}