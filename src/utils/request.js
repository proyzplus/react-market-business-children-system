// 引入axios
import { proxy_localForage } from './localForage.interceptor';
import axios from 'axios';
import { message } from 'antd';


// 创建axios实例
const service = axios.create({
      baseURL: process.env.REACT_APP_URL1, // api的base_url  Vue项目可以根据 process.env.BASE_API，React可以在这里定义
      timeout: 20000, // 请求超时时间
      withCredentials: true, // 跨域携带cookie
});

// 添加请求拦截器，这里面可以配置一下每次请求都需要携带的参数，比如 token，timestamp等等，根据项目自己配置
service.interceptors.request.use(
      function (request) {
            return new Promise(async (resolve, reject) => {
                  let jwt = "";
                  // let jwt = store.state.user.userInfo.jwt;
                  // if (jwt.length < 5) {
                  try {
                        let newName = sessionStorage.getItem("nowUser");
                        jwt = (await proxy_localForage.getItem(newName + "userInfo")).jwt;
                  } catch (e) {
                        console.error();
                  }
                  // }
                  if (!request.url.includes("login")) {
                        request.headers["x-authorization-token"] = jwt;
                  }
                  if (!(request.method.toLowerCase() === "get")) {
                        return resolve(request);
                  } else {
                        // if (store.state.config.core.api.cache.enable) {
                        //       vue.$localForage.getItem(JSON.stringify(request)).then(res => {
                        //             //如果缓存时间小于2小时 则读取 超过2小时 发起新的请求
                        //             if (res && res.data && res.cacheTime && new Date().getTime() - res.cacheTime <= store.state.config.core.api.cache.expiresIn) {
                        //                   store.dispatch("update_loading_show", false);
                        //                   return resolve(res.data);
                        //             } else {
                        //                   return resolve(request);
                        //             }

                        //       });
                        // } else {
                        return resolve(request);
                        // }
                  }
            });
      }
);

// 添加响应拦截器 ，这里的 response是接收服务器返回后的结果，也可以在这里做一些状态判断
service.interceptors.response.use(
      async function (response) {
            if (proxy_localForage.getItem(sessionStorage.getItem("nowUser") + "userInfo")) {
                  if (!response.request.method) {
                        response.request.method = response.config.method;
                  }
                  if (response.data.error_msg === "jwt过期，请重新登录--jwt过期") { //新接口jwt过期
                        proxy_localForage.clear();
                        sessionStorage.setItem("nowUser", "");
                        message.error('登录信息失效,请重新登录');
                        setTimeout(() => {
                              window.location.reload();
                        }, 300);
                        return Promise.reject("登录信息失效,请重新登录");
                  }
                  if (response.data.code === "401") { //老接口cookie过期
                        proxy_localForage.clear();
                        sessionStorage.setItem("nowUser", "");
                        message.error('登录信息失效，请重新登录--cookie过期');
                        setTimeout(() => {
                              window.location.reload();
                        }, 300);
                        return Promise.reject("登录信息失效，请重新登录");
                  }
                  if (response.data.msg || response.data.err || response.data.error_msg) {
                        if (response.data.error_msg === 'jwt过期，请重新登录') {
                              return false;
                        } else {
                              if (response.data.error_extra) {
                                    setTimeout(function () {
                                          message.error("Network：" + (response.data.error_extra));
                                    }, 300);
                              }
                              message.error("Network：" + (response.data.msg || response.data.err || response.data.error_msg));
                              Promise.reject(response.data.msg || response.data.err || response.data.error_msg);
                        }
                  }
                  try {
                        response.request.headers["Content-Type"] = "";
                  } catch (e) {
                        response.headers["Content-Type"] = "";
                  }
                  if (response.request.method.toLowerCase() === "get") {
                        proxy_localForage.setItem(
                              JSON.stringify(response.request), {
                              cacheTime: new Date().getTime(),
                              data: response.data
                        }
                        );
                  }
                  return response.data;
            }
      },
      async function (err) {
            if (proxy_localForage.getItem(sessionStorage.getItem("nowUser") + "userInfo")) {
                  if (err === 'Error: Request failed with status code 401') {
                        proxy_localForage.clear();
                        sessionStorage.setItem("nowUser", "");
                        message.error("登录信息失效,请重新登录");
                        setTimeout(() => {
                              window.location.reload()
                        }, 1300);
                        return Promise.reject("登录信息失效,请重新登录");
                  }
                  if (err.status === 401) {
                        message.error("Network：" + err);
                        proxy_localForage.clear();
                        window.location.reload();
                  } else {
                        message.error("网络异常，请稍后再试!");
                  }
                  return Promise.reject(err);
            }
      }
);

export default service;
