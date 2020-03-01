// 一个请求的变量：1. 请求方式，2. body 类型(formdata, json, x-www-form-urlencoded)
// 请求方式加前缀： post: post_xxx
// body 类型默认 json，如果是 formdata 则加前缀: formdata_xxx

// 数据格式统一,每一个属性值必须是一个对象


const RequestMap = {
  common: {
    upload: '/other/upload',
  },
  music: {
    list: '/music/list',
    post_addOrUpdate: '/music/addOrUpdate',
    delete_delete: '/music/delete',
    post_export: '/music/export',
  },
  dayreport: {
    post_save: '/dayreport/save',
    getContent: '/dayreport/getContent',
  }
}

export default RequestMap
