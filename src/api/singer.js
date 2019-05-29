import jsonp from 'common/js/jsonp'
import {
  commonParams,
  options
} from './config'

import axios from 'axios'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })

  return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    ct: 24,
    singermid: singerId,
    order: 'listen',
    begin: 0,
    num: 100,
  })

  return jsonp(url, data, options)
}

export function getplaysongvkey(songmid) {
  const url = '/api/getplaysongvkey'
  const data = Object.assign({}, commonParams, {
    // -: 'getplaysongvkey7257571376863041',
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: `{"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"7347620869","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"7347620869","songmid":["${songmid}"],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":24,"cv":0}}`
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data.req_0.data.midurlinfo[0].purl)
  })
}
