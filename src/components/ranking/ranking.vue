<template>

        <v-scroll :data="toplist" class="wrapper" ref="scroll">
            <div class="list">
                <ul class="disclists">
                    <li
                        v-for="item in toplist"
                        :key="item.dissid"
                        class="disclist"
                        @click="selectList(item)"
                    >
                        <img v-lazy="item.picUrl" alt class="avatar">
                        <ul class="desc">
                            <div class="name">{{ item.topTitle }}</div>
                            <li v-for="(song,index) in item.songList" :key="index" class="dissname">{{song.songname}}</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="loading" v-show="!toplist.length">
                <loading></loading>
            </div>
            <router-view></router-view>
        </v-scroll>
        

</template>
<script>
import { getRank } from "api/rank"; //引入recommend.js中的getRecomend方法
import { ERR_OK } from "api/config"; //引入recommend.js中的getRecomend方法
import swiper from "base/swiper";
import scroll from "base/scroll";
import loading from "base/loading";
import { mapMutations } from "vuex";
import {playListMixin} from 'common/js/mixin'
export default {
    mixins:[playListMixin],
    data() {
        return {
            toplist: [],
            checkload: false
        };
    },
    mounted() {
        this.$nextTick(() => {
            this._getRank();
   
        });
    },
    methods: {
        ...mapMutations(["SET_TOP_LIST"]),
        handelPlaylist(){
             let bottom = this.playList.length ?  '70px' : ''
             //scroll 由于是组件，所有需要额外加上$el来获取dom
             this.$refs.scroll.$el.style.bottom = bottom
             this.$refs.scroll.refresh()
         },
        selectList(item) {
            this.$router.push({
                path: `/ranking/${item.id}`
            });
            this.SET_TOP_LIST(item);
        },
        load() {
            if (!this.checkload) {
                this.$refs.scroll.refresh();
                this.checkload = true;
            }
        },
        _getRank() {
            getRank().then(res => {
                if (res.code === ERR_OK) {
                    this.toplist = res.data.topList;
                }
            });
        },
    },
    components: {
        "v-scroll": scroll,
         loading
    }
};
</script>
<style lang="stylus" scoped>
@import '../../common/styles/variable.styl'
@import '../../common/styles/mixin.styl'
.wrapper
    position: fixed
    top: 1.76rem
    left: 0
    right: 0
    bottom: 0
    overflow: hidden
    display: flex
    flex-direction: column
    .loading
        width: 100%
        height: 0
        padding-bottom: 30%
    .list
        .disclists
            padding: 0 0.4rem 0.4rem 0.4rem
            .disclist
                width: 100%
                display: flex
                flex-direction: row
                margin-bottom: 0.36rem
                align-items: flex-start
                &:last-child
                    margin-bottom: 0
                .avatar
                    width: 2rem
                    height: 2rem
                    border-radius: 0.05rem
                    overflow: hidden
                    margin-right: 0.2rem
                    flex: 0 0 2rem
                .desc
                    flex: 1
                    display: flex
                    flex-direction: column
                    .name
                        font-size: $font-size-large-2x
                        color: $color-text-ll
                        no-wrap()
                        margin-bottom: 0.24rem
                    .dissname
                        font-size: $font-size-large-2x
                        color: $color-text-d
                        margin-bottom .24rem
                        &:last-child
                            margin-bottom 0
                        no-wrap()
    .loading
        width: 100%
        position: absolute
        top: 30%
</style>



