<template>
    <transition name="fade">
        <div class="detailWrapper">
            <div class="top">
                <span class="iconfont back" @click="backRank">&#xe654;</span>
                <span class="songsName">{{toplist.topTitle}}</span>
            </div>

            <div class="img" ref="img">
                <img alt class="avatar" ref="avatar" :src="bgImage">
                <div class="playbtn" ref="playbtn" @click="randomPlay">
                    <span class="iconfont play">&#xe606;</span>
                    <span class="text">随机播放</span>
                </div>
            </div>

            <div class="bg-layer" ref="scroll"></div>
            <v-scroll
                :listenScroll="listenScroll"
                class="songsWrapper"
                :data="songs"
                @scroll="scroll"
                ref="list"
            >
                <music-list :songs="songs" :rank="true"></music-list>
            </v-scroll>
            <div class="loading" v-show="!this.songs.length">
                <loading></loading>
            </div>
        </div>
    </transition>
</template>
<script>
const TOP_HEIGHT = 40;
import loading from "base/loading";
import musicList from "base/musicList";
import scroll from "base/scroll";
import { mapGetters, mapActions } from "vuex";
import { getTopListDetail } from "api/rank";
import { ERR_OK } from "api/config";
import { getplaysongvkey } from "api/singer";
import { createdRecommendSong } from "common/js/songs";
import {mixin} from 'common/js/mixin'
export default {
    mixins:['playListMixin'],
    data() {
        return {
            songs: [],
            scrollY: 0
        };
    },
    created() {
        this.$nextTick(() => {
            this._getTopListDetail();
        });
        this.listenScroll = true;
    },
    mounted() {
        this.imgClientHeight = this.$refs.img.clientHeight - TOP_HEIGHT;
    },
    computed: {
        ...mapGetters(["toplist"]),
        bgImage() {
            if (this.songs.length) {
                return this.songs[0].image;
            }
            return "";
        }
    },
    methods: {
        ...mapActions(["selectRandomPlay"]),
        handelPlaylist(){
             let bottom = this.playList.length ?  '70px' : ''
             //scroll 由于是组件，所有需要额外加上$el来获取dom
             this.$refs.list.$el.style.bottom = bottom
             this.$refs.list.refresh()
         },
        randomPlay() {
            this.selectRandomPlay({
                list: this.songs.filter(song => {
                    return song.url !== "";
                })
            });
        },
        scroll(pos) {
            this.scrollY = pos.y;
        },

        backRank() {
            this.$router.push({
                path: "/ranking"
            });
        },
        _getTopListDetail() {
            // 边界情况处理
            if (!this.toplist.id) {
                this.$router.push("/ranking");
                return;
            }
            getTopListDetail(this.toplist.id).then(res => {
                res = res.detail;
                if (res.code === ERR_OK) {
                    let songsList = this._normalDiscSongs(
                        res.data.songInfoList
                    );
                    // 设置歌曲的播放源
                    songsList.forEach(song => {
                        getplaysongvkey(song.mid).then(vkey => {
                            if (!vkey) {
                                console.log("无法获取播放源");
                                return;
                            }
                            let url = `http://dl.stream.qqmusic.qq.com/${vkey}`;
                            song.url = url;
                        });
                    });
                    this.songs = songsList;
                    console.log(this.songs);
                }
            });
        },
        _normalDiscSongs(list) {
            let result = [];
            list.forEach(item => {
                if (item.id && item.mid) {
                    result.push(createdRecommendSong(item));
                }
            });
            return result;
        }
    },
    watch: {
        scrollY(newY) {
            let zIndex = 0;
            let scale = 1;
            let transformScrollY = Math.max(newY, -this.imgClientHeight);
            this.$refs.scroll.style.transform = `translate3d(0,${transformScrollY}px,0)`;
            const percent = Math.abs(newY / this.imgClientHeight);
            if (newY > 0) {
                scale = 1 + percent;
                zIndex = 10;
                this.$refs.avatar.style.transform = `scale(${scale})`;
                this.$refs.img.style.zIndex = zIndex;
                let overHeight =
                    ((this.imgClientHeight + TOP_HEIGHT + newY) / 375) * 100;
                this.$refs.img.style.paddingBottom = `${overHeight}vw`;
            }
            if (newY <= -this.imgClientHeight) {
                zIndex = 10;
                this.$refs.img.style.zIndex = zIndex;
                this.$refs.img.style.paddingBottom = "10.67vw";
                this.$refs.playbtn.style.display = "none";
            } else if (newY < 0 && newY > -this.imgClientHeight) {
                this.$refs.img.style.zIndex = -1;
                this.$refs.img.style.paddingBottom = "70vw";
                this.$refs.playbtn.style.display = "block";
            }
        }
    },
    components: {
        loading,
        musicList,
        "v-scroll": scroll
    }
};
</script>
<style lang="stylus" scoped>
@import '../../common/styles/variable.styl'
.fade-enter-active, .fade-leave-active
    transition: all 0.3s
.fade-enter, .fade-leave-to
    transform: translate3d(100%, 0, 0)
.detailWrapper
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    background-color: $color-background
    z-index: 100
    // transform  scale()
    .top
        .back
            position: absolute
            top: 0.24rem
            left: 0.24rem
            font-size: $font-size-large-3x
            color: $color-theme
            z-index: 11
        .songsName
            position: absolute
            left: 50%
            transform: translateX(-50%)
            top: 0.24rem
            font-size: $font-size-large-3x
            z-index: 11
            text-align: center
            width: 80%
    .img
        position: relative
        top: 0
        left: 0
        z-index: -1
        width: 100%
        height: 0
        padding-bottom: 70%
        background-color: $color-background
        overflow: hidden
        &::after
            content: ''
            position: absolute
            top: 0
            left: 0
            right: 0
            bottom: 0
            background-color: $color-background-d
        .avatar
            width: 100%
            transform-origin: top
        .playbtn
            position: absolute
            left: 50%
            top: 80%
            transform: translate3d(-50%, -40%, 0)
            z-index: 9
            .play
                color: $color-theme
                font-size: $font-size-large-3x
            .text
                color: $color-theme
                font-size: $font-size-large-3x
    .bg-layer
        position: relative
        height: 100%
        background-color: $color-background
    .songsWrapper
        position: fixed
        bottom: 0
        width: 100%
        top: 70vw
        background: $color-background
        // overflow hidden
    .loading
        width: 100%
        position: absolute
        top: 50%
        transform: translateY() -50%
</style>


