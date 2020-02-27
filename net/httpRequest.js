import axios from 'axios';

/**
 * 统一封装是为了对错误进行统一的处理
 * 之所以错误的时候使用 Promise.resolve(error) 是为了让请求的结果继续传递下去
 * */
axios.interceptors.request.use(config => config,
  error => Promise.resolve(error));

axios.interceptors.request.use((data) => {
  if (data.status && data.status === 200) {
    return data;
  }
  return null;
}, (error) => {
  if (error.response.status > 500) {
    console.log('服务器错误!');
  } else if (error.response.status >= 400 && error.response.status < 500) {
    console.log('客户端错误!');
  } else {
    console.log('未知错误!');
  }

  return Promise.resolve(error);
});

function get(url, params = {}) {
  return axios.get(url, {
    params,
  });
}

function post(url, body = {}, config = {}) {
  return axios.post(url, body, config);
}

// 只考虑 get 和 post，不考虑别的请求方式！！！！！！
// const axiosConfig = (apiName, url, payload) => {
//   let data = {}
//   let params = {}
//   let method = 'get'

//   // 只有 get 才是 params
//   if (!apiName.includes('_')) {
//     params = payload
//   } else {
//     method = 'post'
//     data = payload
//   }

//   const config = {
//     method,
//     url,
//     data,
//     params,
//   }

//   axios(config)
// }

const httpRequest = {
  get,
  post,
};

export default httpRequest;
