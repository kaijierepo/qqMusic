import Vue from 'vue'
import Router from 'vue-router'
// import Ranking from 'components/ranking/ranking'
// import Recommend from 'components/recommend/recommend'
// import Search from 'components/search/search'
// import Singer from 'components/singer/singer'
// import singerDetail from 'components/singer/singerDetail'
// import recommendDetail from 'components/recommend/recommendDetail'
// import rankDetail from 'components/ranking/rankDetail'
//路由的懒加载
const Ranking = () => import('components/ranking/ranking')
const Recommend = () => import('components/recommend/recommend')
const Search = () => import('components/search/search')
const Singer = () => import('components/singer/singer')
const singerDetail = () => import('components/singer/singerDetail')
const recommendDetail = () => import('components/recommend/recommendDetail')
const rankDetail = () => import('components/ranking/rankDetail')


Vue.use(Router)

export default new Router({
  linkActiveClass:'active',
  routes: [
    {
      path: '/',
      redirect:'/ranking'
    },
    {
      path:'/ranking',
      component:Ranking,
      children:[{
        path:':id',
        component:rankDetail
      }]
    },
    {
      path:'/recommend',
      component:Recommend,
      children:[{
        path:':id',
        component:recommendDetail
      }]
    },
    {
      path:'/search',
      component:Search,
      children:[{
        path:':id',
        component:singerDetail
      }]
    },
    {
      path:'/singer',
      component:Singer,
      children:[{
        path:':id',
        component:singerDetail
      }]
    }
  ]
})
