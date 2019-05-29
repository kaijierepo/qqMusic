'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const express = require('express') //引入express框架模块
var axios = require('axios') //引入axios模块
var app = express() //实例化express
var apiRoutes = express.Router() //设置路由
app.use('api', apiRoutes) //将路由地址PI注册路由

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    //获取播放源
    before(app) {
      app.get('/api/getplaysongvkey', function (req, res) {
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
      app.get('/api/getDiscList', function (req, res) { //
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
      app.get('/api/getDiscDetail',function(req,res){
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
      app.get('/api/getTopList',function(req,res){
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
       app.get('/api/getTopListDetail',function(req,res){
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
      app.get('/api/getResultList',function(req,res){
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



    },
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [{
        from: /.*/,
        to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
      }, ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ?
      {
        warnings: false,
        errors: true
      } :
      false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },



  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: config.dev.assetsSubDirectory,
      ignore: ['.*']
    }])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors ?
          utils.createNotifierCallback() :
          undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
