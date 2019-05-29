<template>
    <div class="searchWrapper">
        <search-box
            class="search"
            ref="searchBox"
            @quertChange="quertChange"
        ></search-box>
        <v-scroll :data="arrScrollData()" class="resultWrapper" ref="scroll">
            <div>
                <div class="recommend" v-show="!query">
                    <h1 class="title">
                        热门搜索
                    </h1>
                    <ul class="list">
                        <li
                            class="ret"
                            v-for="key in hotKey"
                            :key="key.n"
                            @click.prevent="selectHot(key)"
                        >
                            {{ key.k }}
                        </li>
                    </ul>
                </div>

                <div v-show="searchHistory.length && !query">
                    <v-history
                        @deleteItem="deleteItem"
                        @clearAll="clearAll"
                        @selectItems="selectItems"
                    ></v-history>
                </div>
            </div>
        </v-scroll>
        <div class="serachResult" v-show="query" ref="resultwrapper">
            <result :query="query" @saveSearch="saveSearch" ref="result"></result>
        </div>
        <v-pop v-show="popShow" @cancel="cancel" @clear="clear"></v-pop>
        <router-view></router-view>
    </div>
</template>
<script>
import result from "components/search/result";
import searchBox from "components/search/searchBox";
import { getHotKey } from "api/search.js";
import { ERR_OK } from "api/config.js";
import { mapActions, mapGetters } from "vuex";
import history from "./history";
import scroll from "base/scroll";
import {playListMixin} from 'common/js/mixin'
import pop from 'base/pop'
export default {
    mixins:[playListMixin],
    data() {
        return {
            hotKey: [],
            query: "",
            popShow:false
        };
    },
    components: {
        searchBox,
        result,
        "v-history": history,
        "v-scroll": scroll,
        "v-pop":pop
    },
    mounted() {
        this._getHotKey();

    },
    computed: {
        ...mapGetters(["searchHistory","playList"]),
        
    },
    methods: {
        ...mapActions([
            "saveSearchHistory",
            "deleteSearchHistory",
            "clearSearchHistory"
        ]),
        cancel(){
            this.popShow = false
        },
        clear() {
            this.clearSearchHistory()
            this.popShow = false
        },
        handelPlaylist(){
             let bottom = this.playList.length ?  '80px' : ''
             //scroll 由于是组件，所有需要额外加上$el来获取dom
             this.$refs.scroll.$el.style.bottom = bottom
             this.$refs.resultwrapper.style.bottom = bottom
             this.$refs.scroll.refresh()
             this.$refs.result.refresh()

         },
        arrScrollData() {
            return this.hotKey.concat(this.searchHistory);
        },
        selectItems(item) {
            this.$refs.searchBox.changeText(item);
        },
        clearAll() {
            this.popShow = true
            
        },
        deleteItem(item) {
            this.deleteSearchHistory(item);
        },
        saveSearch() {
            console.log("saveSearch");
            this.saveSearchHistory(this.query);
        },
        quertChange(val) {
            this.query = val;
        },
        selectHot(val) {
            this.$refs.searchBox.changeText(val.k);
        },
        _getHotKey() {
            getHotKey().then(res => {
                if (res.code === ERR_OK) {
                    //    取前10条数据
                    this.hotKey = res.data.hotkey.slice(0, 20);
                }
            });
        }
    }
};
</script>
<style lang="stylus" scoped>
@import '../../common/styles/variable.styl'
.searchWrapper
    padding 0.48rem
    box-sizing border-box
    .resultWrapper
        position fixed
        left 0.48rem
        right 0.48rem
        top 3.4rem
        bottom 0
        overflow hidden
        .recommend
            .title
                font-size $font-size-large-2x
                color $color-text-d
                margin-bottom 0.48rem
            .list
                display flex
                flex-direction row
                flex-wrap wrap
                .ret
                    display inline-block
                    padding 0.1rem 0.2rem
                    border-radius 0.08rem
                    box-sizing border-box
                    background-color $color-highlight-background
                    color $color-text-d
                    font-size $font-size-large-2x
                    margin-right 0.24rem
                    margin-bottom 0.24rem
    .serachResult
        position fixed
        left 0
        right 0
        top 3.4rem
        bottom 0
</style>


