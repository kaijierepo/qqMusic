import jsonp from 'common/js/jsonp'
import {
  commonParams,
  options
} from './config'

import axios from 'axios'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const data = Object.assign({}, commonParams, {
    uin: 0,
    platform: 'h5',
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function getResultList(query, page, zhida,perpage) {
  const url = '/api/getResultList'
  const data = Object.assign({}, commonParams, {
    // -: 'getplaysongvkey7257571376863041',
    uin: 0,
    platform: 'h5',
    needNewCode: 1,
    w: query,
    zhidaqu: zhida ? 1 : 0,
    catZhida: zhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage,
    n: perpage,
    p: page,
    remoteplace: 'txt.mqq.all'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
