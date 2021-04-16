import localForage from "localforage";

localForage.config({
      name: 'http://mktest.looovo.com',
      version: 1.0,
});

export const proxy_localForage = new Proxy(localForage, {});
