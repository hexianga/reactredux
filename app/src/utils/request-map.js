// 一个请求的变量：1. 请求方式，2. body 类型(formdata, json, x-www-form-urlencoded)
// 请求方式加前缀： post: post_xxx
// body 类型默认 json，如果是 formdata 则加前缀: formdata_xxx

// 数据格式统一,每一个属性值必须是一个对象


const RequestMap = {
  music: {
    list: '/v1/music/list',
    post_addOrUpdate: '/v1/music/addOrUpdate',
    delete_delete: '/v1/music/delete',
    post_export: '/v1/music/export',
  }
}

export default RequestMap
