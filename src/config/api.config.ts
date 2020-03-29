let basicURL: string = ''

if (process.env.NODE_ENV === 'development') {
  basicURL = 'http://localhost:3000' + '/api'
} else {
  basicURL = window.location.origin + '/api'
}

// 删除标签
const DELETE_TAG_NAME = `${basicURL}/tagDel`

export {
  DELETE_TAG_NAME
}


