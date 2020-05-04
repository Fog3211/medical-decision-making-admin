import { message } from 'antd'

const token = window.sessionStorage.getItem('token')

const fetchData: (params: fetchType) => Promise<any> = async (params: fetchType) => {
  const { type = 'GET', data = {} } = params

  const requestHeader: RequestInit = {
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
      'token': token
    },
    method: type,
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
  }
  // 处理数据 空值时删除属性 排除数字0
  Object.keys(data).forEach((key) => {
    if (data[key] === null || data[key] === undefined) {
      delete data[key]
    }
  })

  if (type === 'GET') {
    if (data) {
      params.url += transformDataToUrl(data)
    }
  } else {
    requestHeader.body = JSON.stringify(data)
  }

  const res = await (await fetch(params.url, requestHeader)).json()
  if (res.code !== 200) {
    message.error(res.msg)
    return Promise.reject()
  } else {
    return res
  }
}

function transformDataToUrl(data: anyObj) {
  data = data || {}
  let params: string = '?'
  for (const key in data) {
    if (key) {
      params += `${key}=${data[key]}&`
    }
  }
  return params.slice(0, params.lastIndexOf('&'))
}

export default fetchData 