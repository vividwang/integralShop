interface Options {
  method?: string;
  headers?: {
    'Content-Type': string,
    'Accept': string,
    'Authorization': string
  }
}

/**
 *
 * @param {*} url string
 * @param {*} options {}
 * @returns Promise<any>
 */
 export const request = async (requestUrl, options: Options = {}) => {
  const userInfo = JSON.parse(localStorage.getItem('INTEGRAL_SHOP_USER_INFO'));
  const url = process.env.HOST ? process.env.HOST + requestUrl : requestUrl ;

  if (userInfo) {
    return await fetch(url, Object.assign(options, {
      headers: Object.assign(options.headers ? options.headers : {}, {'Authorization': 'Bearer ' + userInfo.token}),
    })).then(res => {
      if (res.status === 500) {
        return res.json();
      }
      if (res.status === 401) {
        window.location.href = '/login?info=401';
        localStorage.removeItem('INTEGRAL_SHOP_USER_INFO');
      } else if (res.headers.get('Content-Type').startsWith('text/plain')){
        return res.text();
      } else {
        return res.json();
      }
    });
  } else {
    return await fetch(url, options).then(res => res.json());
  }
}

export const requestWithBlob = async (requestUrl, options: Options = {}) => {
  const userInfo = JSON.parse(localStorage.getItem('INTEGRAL_SHOP_USER_INFO'));
  const url = process.env.HOST ? process.env.HOST + requestUrl : requestUrl ;

  if (userInfo) {
    return await fetch(url, Object.assign(options, {
      headers: Object.assign(options.headers, {'Authorization': 'Bearer ' + userInfo.token}),
    })).then(res => {
      if (res.status === 401) {
        window.location.href = '/login?info=401';
        localStorage.removeItem('INTEGRAL_SHOP_USER_INFO');
      } else {
        return res.blob();
      }
    });
  } else {
    return await fetch(url, options).then(res => res.blob());
  }
}
