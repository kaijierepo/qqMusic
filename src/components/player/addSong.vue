<template>
    <div class="wrapper" v-show="showFlag">
        <h1 class="title">添加歌曲到列表</h1>
        <span
            class="iconfont iconxianshi_quxiaotianchong icon-close"
            @click.stop="hide"
        ></span>
        <div class="search-box">
            <search-box
                :placeholder="placeholder"
                ref="searchBox"
                @quertChange="quertChange"
            ></search-box>
        </div>
        <div class="switch">
            <switch-btn
                :switchCurrentIndex="switchCurrentIndex"
                :switchObj="switchObj"
                @selectSwitch="selectSwitch"
            >
            </switch-btn>
        </div>
        <div class="rank">
            <div class="play" v-show="switchCurrentIndex === 0">
                <scroll :data="playHistory" class="playScroll">
                    <music-list
                        :songs="playHistory"
                        :rank="false"
                        @selectItem="selectPlayItem"
                    ></music-list>
                </scroll>
            </div>
            <div class="search" v-show="switchCurrentIndex === 1">
                <scroll :data="searchHistory" class="searchScroll">
                    <history
                        :songs="playHistory"
                        :rank="false"
                        :showTitle="showTitle"
                        @selectItems="selectSearchItem"
                        @deleteItem="deleteSearchItem"
                    ></history>
                </scroll>
            </div>
        </div>
        <div class="serachResult" v-show="query" ref="resultwrapper">
            <result
                :query="query"
                @saveSearch="saveSearch"
                ref="result"
            ></result>
        </div>
    </div>
</template>
<script>
import searchBox from "components/search/searchBox";
import switchBtn from "./switchBtn";
import scroll from "base/scroll";
import musicList from "base/musicList";
import history from "components/search/history";
import result from "components/search/result";
import { mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {
            showFlag: false,
            placeholder: "搜索歌曲",
            switchCurrentIndex: 0,
            switchObj: [{ name: "最近播放" }, { name: "搜索历史" }],
            showTitle: false,
            query: ""
        };
    },

    methods: {
        ...mapActions(["selectSearchPlay", "saveSearchHistory","deleteSearchHistory"]),
        quertChange(val) {
            this.query = val;
        },
        saveSearch() {
            this.saveSearchHistory(this.query);
        },
        selectPlayItem(song, index) {
            this.selectSearchPlay(song);
            // console.log(song)
        },
        selectSearchItem(item) {
             this.$refs.searchBox.changeText(item);
        },
        deleteSearchItem(item){
            console.log(item)
             this.deleteSearchHistory(item);
        },
        show() {
            this.showFlag = true;
        },
        hide() {
            this.showFlag = false;
            this.$emit("addSongHide");
        },
        selectSwitch(index) {
            this.switchCurrentIndex = index;
        }
    },
    computed: {
        ...mapGetters(["playHistory", "searchHistory"])
    },
    components: {
        searchBox,
        switchBtn,
        scroll,
        musicList,
        history,
        result
    }
};
</script>
<style lang="stylus" scoped>
@import '../../common/styles/variable.styl'
@import '../../common/styles/mixin.styl'
.wrapper
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background-color $color-background
    z-index 9999
    padding 0.24rem
    box-sizing border-box
    .title
        font-size $font-size-large-3x
        color $color-text
        text-align center
        line-height 1.8rem
    .icon-close
        position absolute
        top 0.48rem
        right 0.48rem
        font-size 30px
        color $color-theme
    .search-box, .switch, .rank
        width 100%
        .play
            .playScroll
                overflow hidden
                position absolute
                left 0
                right 0
                top 4.2rem
                bottom 0
        .search
            .searchScroll
                overflow hidden
                position absolute
                left 0.48rem
                right 0.48rem
                top 4.2rem
                bottom 0
    .serachResult
        position absolute
        left 0
        right 0
        top 3rem
        bottom 0
        z-index 99999
        background-color $color-background
</style>


