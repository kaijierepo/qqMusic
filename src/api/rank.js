import jsonp from 'common/js/jsonp' //引入jsonp
import {
  commonParams,
  options
} from './config' //引入config.js

import axios from 'axios'

export function getRank() {
  const url = '/api/getTopList'
  const data = Object.assign({}, commonParams, {
    g_tk: 2134985872,
    platform: 'h5',
    needNewCode: 1,
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}


export function getTopListDetail(id) {
  const url = '/api/getTopListDetail'
  const data = Object.assign({}, commonParams, {
    g_tk: 2134985872,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {
      "detail": {
        "module": "musicToplist.ToplistInfoServer",
        "method": "GetDetail",
        "param": {
          "topId": id,
          "offset": 0,
          "num": 20,
        }
      },
      "comm": {
        "ct": 24,
        "cv": 0
      }
    }

  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
