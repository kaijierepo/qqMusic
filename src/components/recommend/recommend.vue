<template>
    <div>
        <v-scroll :data="disclist" class="wrapper" ref="scroll">
            <div>
                <div>
                    <v-swiper :recommends="recommends" @load="load"></v-swiper>
                </div>
                <div class="title">热门歌单推荐</div>
                <div class="loading" v-show="!disclist.length">
                    <v-loading></v-loading>
                </div>
                <div class="list">
                    <ul class="disclists">
                        <li
                            v-for="item in disclist"
                            :key="item.dissid"
                            class="disclist"
                            @click="selectDisc(item)"
                        >
                            <img v-lazy="item.imgurl" alt class="avatar">
                            <div class="desc">
                                <div class="name">{{ item.dissname }}</div>
                                <span class="dissname">{{ item.creator.name }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </v-scroll>
        <router-view></router-view>
    </div>
</template>
<script>
import { getRecommend, getDiscList} from "api/recommend"; //引入recommend.js中的getRecomend方法
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
            recommends: [],
            disclist: [],
            checkload: false,
        };
    },
    mounted() {
        this.$nextTick(() => {
            this._getRecommend();
            this._getDiscList();
        });
       
    },
    methods: {
        ...mapMutations(["SET_DISC"]),
         handelPlaylist(){
             let bottom = this.playList.length ?  '70px' : ''
            //  console.log(bottom)
             //scroll 由于是组件，所有需要额外加上$el来获取dom
             this.$refs.scroll.$el.style.bottom = bottom
             this.$refs.scroll.refresh()
         },
        selectDisc(item) {
            this.$router.push({
                path: `/recommend/${item.dissid}`
            });
            this.SET_DISC(item)
        },
        load() {
            if (!this.checkload) {
                this.$refs.scroll.refresh();
                this.checkload = true;
            }
        },
        _getRecommend() {
            getRecommend().then(res => {
                if (res.code === ERR_OK) {
                    this.recommends = res.data.slider;
                }
            });
        },
        _getDiscList() {
            getDiscList().then(res => {
                if (res.code === ERR_OK) {
                    this.disclist = res.data.list;
                    // console.log(res.data.list);
                }
            });
        }
    },
    components: {
        "v-swiper": swiper,
        "v-scroll": scroll,
        "v-loading": loading
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
    .title
        line-height: 1.3rem
        text-align: center
        color: $color-theme
        font-size: $font-size-large-2x
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
                    width: 1.2rem
                    height: 1.2rem
                    border-radius: 0.05rem
                    overflow: hidden
                    margin-right: 0.2rem
                    flex: 0 0 1.2rem
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
                        no-wrap()
</style>



