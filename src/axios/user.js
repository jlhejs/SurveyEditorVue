import request from '@/axios/index.js'

export function login(data) {
  return request({
    url: '/auth/Login/LoginSubmitDefault',
    method: 'post',
    data
  })
  
}

export function getInfo(token) {
  return request({
    url: '/auth/info',
    method: 'get',
    params: { token }
  })
}

export function logout(tokenId) {
  return request({
    url: '/oauth/api/Login/LoginOut',
    headers:{
      Authorization:tokenId
    },
    data:{
    },
    method: 'post'
  })
}
