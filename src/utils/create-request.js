import RequestMap from './request-map'
import axios from 'axios';


let baseurl = 'http://localhost'
// 只考虑 get 和 post，不考虑别的请求方式！！！！！！
async function crearteRequest(apiName, url, payload) {
  let data = {}
  let params = {}
  // 默认 get
  let headers = {
    'Content-type': 'x-www-form-urlencoded'
  }
  let method = 'get'

  // 只有 get 才是 params
  if (!apiName.includes('_')) {
    params = payload
  } else {
    method = 'post'
    data = payload

    // post 的 body 体只使用 json 和 formdata 两种
    // formdata 不用设置 Content-Type
    if (apiName.includes('formdata')) {
      headers = {}
    } else {
      headers = {
        'Content-type': 'application/json'
      }
    }
  }

  const config = {
    method,
    headers,
    url: `${baseurl}${url}`,
    data,
    params,
  }

  const response = await axios(config)
  return response.data
}

function apiFactory(map) {
  const result = {}

  Object.entries(map).forEach(apiList => {
    let tempObj = {}

    Object.entries(apiList[1]).forEach(api => {
      tempObj[api[0]] = async (payload) => await crearteRequest(api[0], api[1], payload)
    })

    result[apiList[0]] = tempObj
  })

  return result
}

const Api = apiFactory(RequestMap)

export default Api
