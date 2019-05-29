var express = require('express')
var config = require('./config/index')
var axios = require('axios')
var port = process.env.PORT || config.build.port
var app = express()
var apiRoutes = express.Router()

//播放原
apiRoutes.get('/getplaysongvkey', function (req, res) {
    var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
    axios.get(url, {
      headers: {
        origin: 'https://y.qq.com',
        referer: 'https://y.qq.com/portal/player.html'
      },
      params: req.query
    }).then((response) => {
      res.json(response.data)
    }).catch((e) => {
      console.log(e)
    })
  })


  // 歌单
  apiRoutes.get('/getDiscList', function (req, res) { //
    var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg' // 原api  
    axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com' //访问的域名
      },
      params: req.query //req.query我打印过是url的data参数
    }).then((response) => {

      res.json(response.data) //发送一个JSON响应

    }).catch((e) => {
      console.log(e)
    })
  })

  //歌单详情
  apiRoutes.get('/getDiscDetail',function(req,res){
    var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

    axios.get(url, {
      headers: {
        referer: 'https://y.qq.com/n/yqq/playsquare/6938020960.html',
        origin: 'https://y.qq.com' //访问的域名
      },
      params: req.query //req.query我打印过是url的data参数
    }).then((response) => {

      res.json(response.data) //发送一个JSON响应

    }).catch((e) => {
      console.log(e)
    })
  })
 
  //获取排行榜数据
  apiRoutes.get('/getTopList',function(req,res){
    var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

    axios.get(url, {
      headers: {
        referer: 'https://y.qq.com/m/index.html',
        origin: 'https://y.qq.com' //访问的域名
      },
      params: req.query //req.query我打印过是url的data参数
    }).then((response) => {

      res.json(response.data) //发送一个JSON响应

    }).catch((e) => {
      console.log(e)
    })
  })

   //获取排行榜详情列表
   apiRoutes.get('/getTopListDetail',function(req,res){
    var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

    axios.get(url, {
      headers: {
        referer: 'https://y.qq.com/n/yqq/toplist/4.html',
        origin: 'https://y.qq.com' //访问的域名
      },
      params: req.query //req.query我打印过是url的data参数
    }).then((response) => {

      res.json(response.data) //发送一个JSON响应

    }).catch((e) => {
      console.log(e)
    })
  })

  //获取搜索结果
  apiRoutes.get('/getResultList',function(req,res){
    var url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

    axios.get(url, {
      headers: {
        referer: 'https://y.qq.com/m/index.html',
        origin: 'https://y.qq.com' //访问的域名
      },
      params: req.query //req.query我打印过是url的data参数
    }).then((response) => {

      res.json(response.data) //发送一个JSON响应

    }).catch((e) => {
      console.log(e)
    })
  })


app.use('/api', apiRoutes)
app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})