import jsonp from 'common/js/jsonp'          //引入jsonp
import { commonParams, options } from './config'    //引入config.js
import axios from  'axios'

export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    const data = Object.assign({}, commonParams, {     //es6的assign将commonParams和
        uin: 0,                      //之后的对象合并为一起，放在
        platform: 'h5',                   //前面的{}之中。
        needNewCode: 1,
    })
    return jsonp(url, data, options)
}

export function getDiscList() {
    const url = '/api/getDiscList'
    const data = Object.assign({}, commonParams, {
        platform: 'yqq', // 加引号  
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json'
    })
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

export function getDiscDetail(disstid) {
    const url = '/api/getDiscDetail'
    const data = Object.assign({}, commonParams, {
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        new_format: 1,
        disstid,
        loginUin: 0,
        hostUin: 0,
        platform:'yqq.json',
        needNewCode: 0
    })
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

