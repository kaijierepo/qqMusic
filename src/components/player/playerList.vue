<template>
    <transition name="fade">
        <div class="listWrap" v-show="isshow" @click="close">
            <div class="list" @click.stop>
                <div class="top">
                    <div class="play">
                        <span class="iconfont" :class="iconMode" @click.stop="changeMode"></span>
                        {{modeText}}
                    </div>
                    <span
                        class="iconfont iconlajitong clear"
                        @click.stop="clearList"
                    ></span>
                </div>
                <v-scroll ref="scroll" class="scroll" :data="list">
                    <transition-group tag="ul" name="list" class="songs">
                        <li
                            class="song"
                            v-for="(item, index) in list"
                            :key="item.id"
                            ref="song"
                            @click.stop="selectPlay(item, index)"
                        >
                            <span
                                class="iconfont icon-play"
                                :class="iconPlay(item)"
                            ></span>
                            <span class="name">{{ item.name }}</span>
                            <div class="btn">
                                <span
                                    class="iconshoucang iconfont icon-collect"
                                ></span>
                                <span
                                    class="iconfont iconxianshi_quxiaotianchong"
                                    @click.stop="deleteItem(item)"
                                ></span>
                            </div>
                        </li>
                    </transition-group>
                </v-scroll>

                <div class="add" @click="showAddSong">
                    添加歌曲到队列
                </div>
                <div class="close" @click="close">
                    关闭
                </div>
                <add-song ref="addSong" @addSongHide="addSongHide"></add-song>
            </div>
            <pop v-show="popShow" @cancel="cancel" @clear="clear"></pop>
        </div>
    </transition>
</template>
<script>
import scroll from "base/scroll";
import { mapGetters } from "vuex";
import pop from "base/pop";
import {playModeMixin} from 'common/js/mixin'
import addSong from './addSong'
export default {
    mixins:[playModeMixin],
    props: {
        list: {
            type: Array,
            default: [],
            
        }
    },
    data() {
        return {
            isshow: false,
            popShow: false
        };
    },
    methods: {
        // 重新加载一次
        addSongHide(){
            // this._scrollToElement()
        },
        // 显示添加歌曲窗口
        showAddSong(){
            this.$refs.addSong.show()
        },
        // 显示弹窗
        cancel() {
            this.popShow = false;
        },
        clear() {
            this.$emit("clearPlayList");
            this.popShow = false;
        },
        show() {
            this.isshow = true;
            setTimeout(() => {
                this.$refs.scroll.refresh();
                this._scrollToElement();
            }, 20);
        },
        hidden() {
            this.isshow = false;
        },
        close() {
            this.isshow = false;
        },
        iconPlay(item) {
            if (this.currentSong.id === item.id) {
                return "iconbofang";
            }
            return "";
        },
        clearList() {
            // this.clearPlayList()
            this.popShow = true
            
        },
        selectPlay(item, index) {
            this.$emit("selectPlay", item, index);
        },
        deleteItem(item) {
            this.$emit("deleteItem", item);
        },
        _scrollToElement() {
            let index = this.list.findIndex(item => {
                return item.id === this.currentSong.id;
            });
            let els = this.$refs.song[index];
            console.log(els);
            this.$refs.scroll.scrollToElement(els, 300);
        }
    },
    computed: {
        ...mapGetters(["currentSong"])
    },
    components: {
        "v-scroll": scroll,
        pop,
        addSong
    }
};
</script>
<style lang="stylus" scoped>
@import '../../common/styles/variable.styl'
@import '../../common/styles/mixin.styl'
.listWrap
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background-color $color-background-d
    z-index 998
    &.fade-enter-active, .fade-leave-active
        transition opacity 0.3s
        .list
            transition all 0.3s
    &.fade-enter, .fade-leave-to
        opacity 0
        .list
            transform translate3d(0, 100%, 0)
    .list
        position absolute
        left 0
        right 0
        bottom 0
        background-color $color-highlight-background
        z-index 999
        .top
            display flex
            align-items center
            height 50px
            justify-content space-between
            padding-left 0.48rem
            padding-right 0.48rem
            box-sizing border-box
            .play
                display flex
                align-items center
                font-size $font-size-large-2x
                color $color-text-d
                span
                    margin-right 0.12rem
            .clear
                font-size $font-size-large-3x
                color $color-text-d
        .scroll
            max-height 300px
            width 100%
            overflow hidden
            .songs
                .song
                    display flex
                    align-items center
                    padding-left 0.48rem
                    padding-right 0.48rem
                    box-sizing border-box
                    height .8rem
                    &.list-enter-active,&.list-leave-active
                        transition  all .1s linear
                    &.list-enter, &.list-leave-to
                        height 0
                    .icon-play
                        color $color-theme
                        opacity 0.5
                        margin-right 0.24rem
                        flex 0 0 0.3rem
                    .name
                        flex 1
                        font-size $font-size-large-2x
                        color $color-text-d
                        no-wrap()
                    .btn
                        flex 0 0 1rem
                        color $color-theme
                        display flex
                        align-items center
                        .icon-collect
                            margin-right 0.48rem
                            margin-left 0.24rem
        .add
            width 100%
            text-align center
            font-size $font-size-large-2x
            color $color-text-d
            line-height 1rem
        .close
            width 100%
            text-align center
            background-color $color-background
            font-size $font-size-large-3x
            line-height 1rem
</style>


