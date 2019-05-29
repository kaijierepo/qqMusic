<template>
    <div class="playWrapper" v-show="playList.length">
        <transition name="normal">
            <div class="normalWrapper" v-show="fullScreen">
                <div class="bgimg">
                    <img
                        width="100%"
                        height="100%"
                        :src="currentSong.image"
                        alt
                    />
                </div>
                <span class="iconfont back" @click="setMiniPlay">&#xe692;</span>
                <div class="top">
                    <div class="songs">{{ currentSong.name }}</div>
                    <div class="singer">{{ currentSong.singer }}</div>
                </div>
                <div class="middle">
                    <div class="cd" ref="cd" :class="playStatus">
                        <img
                            width="100%"
                            height="100%"
                            :src="currentSong.image"
                            alt
                        />
                    </div>
                </div>
                <div class="time">
                    <span class="progressTime">{{ progressTime }}</span>
                    <div class="timeBar">
                        <progress-bar
                            :percent="percent"
                            @precentChange="precentChange"
                        ></progress-bar>
                    </div>
                    <span class="totalTime">{{ totalTime }}</span>
                </div>
                <div class="bottom">
                    <span
                        class="iconfont mode "
                        :class="iconMode"
                        @click="changeMode"
                    ></span>
                    <span
                        class="iconfont prev iconshangyishou"
                        @click="prevSong"
                    ></span>
                    <span
                        class="iconfont play"
                        :class="iconPlay"
                        @click="togglePlay"
                        ref="play"
                    ></span>
                    <span
                        class="iconfont next iconxiayishou"
                        @click="nextSong"
                    ></span>
                    <span class="iconfont collection iconshoucang"></span>
                </div>
            </div>
        </transition>
        <transition name="mini">
            <div class="minWrapper" v-show="!fullScreen" @click="setFullPlay">
                <div class="mini-left">
                    <div class="miniAvatar">
                        <div class="minicd" :class="playStatus">
                            <img
                                width="100%"
                                height="100%"
                                :src="currentSong.image"
                                alt
                            />
                        </div>
                    </div>
                    <div class="miniDesc">
                        <h1 class="miniName">{{ currentSong.name }}</h1>
                        <span class="miniSinger">{{ currentSong.singer }}</span>
                    </div>
                </div>
                <div class="mini-right">
                    <div class="miniPlay">
                        <span
                            class="iconfont play miniPlayIcon"
                            :class="MiniIconPlay"
                            @click.stop.prevent="togglePlay"
                            ref="play"
                        ></span>
                    </div>
                    <div class="miniPlayList">
                        <span
                            class="iconfont iconai-list miniPlayListIcon"
                            @click.stop="showPlayList"
                        ></span>
                    </div>
                </div>
            </div>
        </transition>
        <play-list ref="playLists" 
                    :list="sequenceList" 
                    @clearPlayList="handelClearPlayList" 
                    @selectPlay="handelSelectPlay"
                    @deleteItem="deleteItem"
                    ></play-list>
        
        <audio
            :src="currentSong.url"
            ref="audio"
            @canplay="ready"
            @error="error"
            @timeupdate="timeUpdate"
            @ended="end"
        ></audio>
    </div>
</template>
<script>
import { mapGetters, mapMutations , mapActions} from "vuex";
import { time } from "common/js/time";
import progressBar from "./progressBar";
import { playMode } from "common/js/config.js";
import playList from "./playerList";
import {playModeMixin} from 'common/js/mixin.js'
export default {
    mixins:[playModeMixin],
    data() {
        return {
            songReady: false,
            currentTime: 0,
           
        };
    },
    computed: {
        ...mapGetters([
            "fullScreen",
            "playList",
            "currentSong",
            "playing",
            "currentIndex",
            "mode",
            "sequenceList"
        ]),
        iconPlay() {
            if (this.playing) {
                return "iconbofang1";
            } else {
                return "iconbofang";
            }
        },
        MiniIconPlay() {
            if (this.playing) {
                return "iconbofang1";
            } else {
                return "iconbofang";
            }
        },
        playStatus() {
            if (this.playing) {
                if (this.songReady) {
                    return "play";
                }
            } else {
                return "pause";
            }
        },
        // 总时间
        totalTime() {
            return time(this.currentSong.duration);
        },
        //当前歌曲时间
        progressTime() {
            return time(this.currentTime);
        },
        //歌曲进度
        percent() {
            return this.currentTime / this.currentSong.duration;
        }
    },
    methods: {
        ...mapMutations([
            "SET_PLAYING",
            "SET_FULLSCREEN",
            "SET_CURRENTINDEX",
            "SET_MODE",
            "SET_PLAYLIST"
        ]),
        
        ...mapActions(['clearPlayList','selectPlay','deleteSongs','savePlayHistory']),
        // 删除播放列表中的一首歌
        deleteItem(item){
            // console.log(item)
            this.deleteSongs(item)
        },
        // 播放列表中的歌曲
        handelSelectPlay(item,index){
            if(this.mode === playMode.random) {
                index = this.playList.findIndex((song) => {
                    return song.id === item.id
                })
            }
            // console.log(index)
            this.SET_CURRENTINDEX(index)
            this.SET_PLAYING(true)
        },
        //清除播放列表
        handelClearPlayList(){
            console.log('clearList')
            this.clearPlayList()
        },
        //显示播放列表
        showPlayList(){
            this.$refs.playLists.show()
        },
        // 更新时间
        timeUpdate(e) {
            this.currentTime = e.target.currentTime;
        },
        precentChange(val) {
            let currentTime = val * this.currentSong.duration;
            this.$refs.audio.currentTime = currentTime;
            if (!this.playing) {
                this.togglePlay();
            }
        },
        togglePlay() {
            if (!this.songReady) {
                return;
            }
            this.SET_PLAYING(!this.playing);
        },
        //显示mini播放器
        setMiniPlay() {
            this.SET_FULLSCREEN(false);
        },
        // 切换全屏幕
        setFullPlay() {
            this.SET_FULLSCREEN(true);
        },
        // 设置下一首歌曲
        nextSong() {
            if (!this.songReady) {
                return;
            }
            let index = this.currentIndex + 1;
            if (index === this.playList.length) {
                index = 0;
            }
            this.SET_CURRENTINDEX(index);
            this.SET_PLAYING(true);
            this.songReady = false;
        },
        // 设置上一首
        prevSong() {
            if (!this.songReady) {
                return;
            }
            let index = this.currentIndex - 1;
            if (index === -1) {
                index = this.playList.length - 1;
            }
            this.SET_CURRENTINDEX(index);
            this.SET_PLAYING(true);
            this.songReady = false;
        },
        //歌曲循环播放
        loop() {
            this.$refs.audio.currentTime = 0;
            this.$refs.audio.play();
        },
        //歌曲准备好了
        ready() {
            this.songReady = true;
            this.savePlayHistory(this.currentSong)
        },
        // 歌曲网络出错
        error() {
            this.songReady = true;
        },
        //歌曲播放完毕
        end() {
            if (this.mode === playMode.loop) {
                // console.log("歌曲播放完毕");
                this.loop();
            } else {
                this.nextSong();
            }
        }
    },
    mounted() {
        // console.log(this.currentSong)
    },
    watch: {
        currentSong(newSong, oldSong) {
            if (newSong.id === oldSong.id) {
                return;
            }
            this.$nextTick(() => {
                this.$refs.audio.play();
            });
        },
        playing(newplaying) {
            let audio = this.$refs.audio;
            this.$nextTick(() => {
                newplaying ? audio.play() : audio.pause();
            });
        }
    },
    components: {
        progressBar,
        playList,
    }
};
</script>
<style lang="stylus" scoped>
@import '../../common/styles/variable.styl'
@import '../../common/styles/mixin.styl'
.playWrapper
    .normalWrapper
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        z-index 100
        background-color $color-background
        .bgimg
            position absolute
            top 0
            left 0
            width 100%
            height 100%
            opacity 0.6
            filter blur(20px)
            z-index -1
            overflow hidden
        .back
            font-size 0.48rem
            color $color-theme
            position absolute
            left 0.48rem
            top 0.24rem
        .top
            position absolute
            left 50%
            top 0.48rem
            transform translate3d(-50%, 0, 0)
            .songs
                font-size $font-size-large-3x
                margin-bottom 0.18rem
                margin-top 0.24rem
                text-align center
            .singer
                font-size $font-size-large-2x
                text-align center
        .middle
            width 75vw
            height 75vw
            overflow hidden
            position absolute
            border 10px solid $color-text-d
            border-radius 75vw
            top 35%
            left 50%
            transform translate3d(-50%, -35%, 0)
            // 控制播放器旋转和暂停
            .cd
                width 100%
                height 100%
                border-radius 50%
                overflow hidden
                animation rotate 16s linear infinite
                &.play
                    animation-play-state running
                &.pause
                    animation-play-state paused
        .time
            position absolute
            bottom 16%
            left 50%
            transform translate3d(-50%, 0, 0)
            display flex
            align-items center
            width 80%
            .progressTime
                color $color-text
                font-size $font-size-large-x
                width 10%
                text-align right
            .timeBar
                width 80%
                margin-left 0.24rem
                margin-right 0.24rem
            .totalTime
                width 10%
                text-align left
                color $color-text
                font-size $font-size-large-x
        .bottom
            position absolute
            bottom 6%
            left 50%
            transform translate3d(-50%, 0, 0)
            display flex
            align-items center
            color $color-theme
            .mode
                font-size 0.5rem
            .prev
                font-size 0.5rem
                margin-left 0.48rem
            .play
                font-size 0.7rem
                margin-left 0.48rem
                margin-right 0.48rem
            .next
                font-size 0.5rem
                margin-right 0.48rem
            .collection
                font-size 0.5rem
    .minWrapper
        position fixed
        top auto
        height 70px
        left 0
        right 0
        bottom 0
        z-index 110
        background-color $color-highlight-background
        display flex
        align-items center
        flex-direction row
        justify-content space-between
        padding 0 0.48rem 0 0.48rem
        box-sizing border-box
        .mini-left
            display flex
            align-items center
            .miniAvatar
                width 50px
                height 50px
                border-radius 50px
                border 2px solid $color-text-d
                overflow hidden
                .minicd
                    width 100%
                    height 100%
                    border-radius 50%
                    animation rotate 16s linear infinite
                    &.play
                        animation-play-state running
                    &.pause
                        animation-play-state paused
            .miniDesc
                display flex
                flex-direction column
                margin-left 0.24rem
                .miniName
                    font-size $font-size-large-2x
                    margin-bottom 0.24rem
                .miniSinger
                    font-size $font-size-large-x
                    color $color-text-d
        .mini-right
            display flex
            align-items center
            .miniPlay
                display flex
                align-items center
                margin-right 0.48rem
                .miniPlayIcon
                    font-size 30px
                    color $color-theme
            .miniPlayList
                display flex
                align-items center
                .miniPlayListIcon
                    font-size 30px
                    color $color-theme
    .normal-enter-active, .normal-leave-active
        transition all 0.3s
    .normal-enter, .normal-leave
        opacity 0
        transform translate3d(0, 100%, 0)
    .mini-enter-active, .mini-leave-active
        transition all 0.2s
    .mini-enter, .mini-leave
        transform translate3d(0, 100%, 0)
@keyframes rotate
    from
        transform rotate(0deg)
    to
        transform rotate(360deg)
</style>

