<template>
    <transition name="fade">
        <div class="detailWrapper">
            <div class="top">
                <span class="iconfont back" @click="backRecommend">&#xe654;</span>
                <span class="songsName">{{disc.dissname}}</span>
            </div>

            <div class="img" ref="img">
                <img alt class="avatar" ref="avatar" :src="disc.imgurl">
                <div class="playbtn" ref="playbtn" @click="randomPlay">
                    <span class="iconfont play">&#xe606;</span>
                    <span class="text">随机播放</span>
                </div>
            </div>

            <div class="bg-layer" ref="scroll"></div>
            <v-scroll
                :data="songs"
                class="songsWrapper"
                :listenScroll="listenScroll"
                @scroll="scroll"
                ref="list"
            >
                <music-list :songs="newSongs" @selectItem="handelSelectItem"></music-list>
            </v-scroll>
            <div class="loading" v-show="!songs.length">
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
import { getDiscDetail } from "api/recommend";
import { ERR_OK } from "api/config";
import { getplaysongvkey } from "api/singer";
import { createdRecommendSong } from "common/js/songs";
export default {
    data() {
        return {
            songs: [],
            scrollY: 0
        };
    },
    created() {
        this.$nextTick(() => {
            this._getDiscDetail();
        });
        this.listenScroll = true;
    },
    mounted() {
        this.imgClientHeight = this.$refs.img.clientHeight - TOP_HEIGHT;
    },
    computed: {
        ...mapGetters(["disc"]),
         newSongs() {
            let result = this.songs.filter(song => {
                return song.url !== "";
            });
            return result;
            console.log(result);
        },
    },
    methods: {
        ...mapActions(["selectRandomPlay","selectPlay"]),
        handelSelectItem(item, index){
            this.selectPlay({
                list: this.newSongs,
                index
            });
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

        backRecommend() {
            this.$router.push({
                path: "/recommend"
            });
        },
        _getDiscDetail() {
            // 边界情况处理
            if (!this.disc.dissid) {
                this.$router.push("/recommend");
                return;
            }
            getDiscDetail(this.disc.dissid).then(res => {
                // console.log(res.cdlist[0].songlist)
                if (res.code === ERR_OK) {
                    let songsList = this._normalDiscSongs(
                        res.cdlist[0].songlist
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
</style>


