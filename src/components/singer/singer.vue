<template>
    <div class="bg" ref="singer">
        <list-view :singers="singers" @selectSinger="selectSinger" ref="singerScroll"></list-view>
        <router-view></router-view>
    </div>
</template>
<script>
import listView from "base/listView";
import { getSingerList } from "api/singer"; //引入recommend.js中的getRecomend方法
import { ERR_OK } from "api/config"; //引入recommend.js中的getRecomend方法
import {singer} from "common/js/singer.js";
const HOT_NAME = "热门";
const HOT_SINGERS_LENGTH = 10;
import {playListMixin} from 'common/js/mixin'
export default {
    mixins:[playListMixin],
    data() {
        return {
            singers: [],
        };
    },
    mounted() {
        this.$nextTick(() =>{
            this._getSingerList();
        })
    },
    methods: {
        handelPlaylist(){
             let bottom = this.playList.length ?  '70px' : ''
             //scroll 由于是组件，所有需要额外加上$el来获取dom
             this.$refs.singer.style.bottom = bottom
             this.$refs.singerScroll.refresh()
         },
        selectSinger (singer) {
            this.$router.push({
                path:`/singer/${singer.id}`
            })
        },
        _getSingerList() {
            getSingerList().then(res => {
                if (res.code === ERR_OK) {
                    this.singers = this._normalList(res.data.list)
                }
            });
        },
        _normalList(list) {
            let map = {
                hot: {
                    title: HOT_NAME,
                    item: []
                }
            };
            list.forEach((element, index) => {
                if (index < HOT_SINGERS_LENGTH) {
                    map.hot.item.push(
                        new singer({
                            id: element.Fsinger_mid,
                            name: element.Fsinger_name
                        })
                    );
                }
                let key = element.Findex;
                if (!map[key]) {
                    map[key] = {
                        title: key,
                        item: []
                    };
                }
                map[key].item.push(
                    new singer({
                        id: element.Fsinger_mid,
                        name: element.Fsinger_name
                    })
                );
            });
            let hot = []
            let ret = []
            for (let key in map) {
                if(map[key].title.match(/[a-zA-Z]/)){
                    ret.push(map[key])
                }else if (map[key].title === HOT_NAME){
                    hot.push(map[key])
                }
                
            }
            ret.sort((a,b)=>{
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            return hot.concat(ret)
        }
    },
    components: {
        listView
    }
};
</script>
<style lang="stylus" scoped>
    .bg
        position fixed
        top 1.76rem
        left 0
        right 0
        bottom 0 
</style>





