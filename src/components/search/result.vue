<template>
    <v-scroll class="suggest" :data="newSongs" :pullup="pullup" @scrollToEnd="searchMore"   ref="suggest">
        <ul class="suggest-list">
            <li
                class="suggest-item"
                v-for="(item,index) in newSongs"
                :key="index"
                @click="selectItem(item,index)"
              
            >
                <span class="iconfont icon" :class="getIcon(item)"></span>
                <span class="text" v-html="getText(item)"></span>
            </li>
            <v-loading v-show="hasMore"></v-loading>
        </ul>
       <div class="noResult" v-show=" !hasMore && !newSongs.length">
           <v-noresult></v-noresult>
       </div>
    </v-scroll>
</template>
<script>
import scroll from "base/scroll";
import { getResultList } from "api/search";
import { ERR_OK } from "api/config";
import { createdSong } from "common/js/songs";
import { getplaysongvkey } from "api/singer";
import { mapActions, mapMutations , mapGetters } from "vuex";
import { singer } from "common/js/singer.js";
import loading from "base/loading";
import noResult from './noResult'
const TYPE_SINGER = "singer";
const PERPAGE = 20;
export default {
    data() {
        return {
            resultList: [],
            page: 1,
            pullup: true,
            hasMore: true
        };
    },
    props: {
        query: {
            type: String,
            default: ""
        },
        showSinger: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        query() {
            this.search();
        }
    },
    methods: {
        ...mapActions(["selectSearchPlay"]),
        ...mapMutations(["SET_SINGER"]),
        refresh(){
            this.$refs.suggest.refresh()
        },
        selectItem(item, index) {
            if (item.type === TYPE_SINGER) {
                this.$router.push({
                    path: `/search/${item.singermid}`
                });
                let ret = new singer({
                    id: item.singermid,
                    name: item.singername
                });
                this.SET_SINGER(ret);
                return;
            }
            this.selectSearchPlay(item)
            this.$emit('saveSearch')
        },
        getIcon(item) {
            if (item.type && item.type === TYPE_SINGER) {
                return "iconShapecopy";
            } else {
                return "icondianyingzhiye-gequbangdianjitai";
            }
        },
        getText(item) {
            if (item.type && item.type === TYPE_SINGER) {
                return item.singername;
            } else {
                return `${item.name}-${item.singer}`;
            }
        },
        searchMore() {
            if (!this.hasMore) {
                return;
            }
            this.page++;
            getResultList(this.query, this.page, false, PERPAGE).then(
                res => {
                    if (res.code === ERR_OK) {
                        this.resultList = this.resultList.concat(
                            this._normalList(res.data)
                        );
                        this._checkMore(res.data);
                    }
                }
            );
        },
        search() {
            this.hasMore = true;
            this.page = 1 
            this.$refs.suggest.scrollTo(0,0)
            getResultList(this.query, this.page, this.showSinger, PERPAGE).then(
                res => {
                    if (res.code === ERR_OK) {
                        this.resultList = this._normalList(res.data);
                        this._checkMore(res.data);
                    }
                }
            );
        },
        _checkMore(data) {
            let songs = data.song;
            if (
                !songs.list.length ||
                songs.curnum + (songs.curpage - 1) * PERPAGE >= songs.totalnum
            ) {
                this.hasMore = false;
            }
        },
        _normalList(data) {
            let ret = [];
            if (data.zhida && data.zhida.singerid ) {
                ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } });
            }
            if (data.song) {
                let temRet = this._normalSong(data.song.list);
                temRet.forEach((song, index) => {
                    getplaysongvkey(song.mid).then(vkey => {
                        if (!vkey) {
                            console.log("无法获取播放源");
                            return;
                        }
                        let url = `http://dl.stream.qqmusic.qq.com/${vkey}`;
                        song.url = url;
                    });
                });
                ret = ret.concat(temRet);
            }
            return ret;
        },
        _normalSong(list) {
            let ret = [];
            list.forEach(musicData => {
                if (musicData.songid && musicData.songmid) {
                    ret.push(createdSong(musicData));
                }
            });
            return ret;
        }
    },
    computed: {
        newSongs() {
            let result = this.resultList.filter(song => {
                return song.url !== "";
            });
            return result;
        }
    },
    components: {
        "v-scroll": scroll,
        "v-loading": loading,
        "v-noresult":noResult
    }
};
</script>
<style lang="stylus" scoped>
@import '../../common/styles/variable.styl'
@import '../../common/styles/mixin.styl'
.suggest
    height: 100%
    overflow: hidden
    .suggest-list
        padding: 0 0.48rem
        box-sizing: border-box
        .suggest-item
            display: flex
            flex-direction: row
            align-items: center
            height: 0.8rem
            &:last-child
                margin-bottom: 0
            .icon
                flex: 0 0 0.3rem
                margin-right: 0.12rem
                font-size: $font-size-large-2x
                color: $color-text-d
            .text
                flex: 1
                color: $color-text-d
                font-size: $font-size-large-2x
                no-wrap()
    .noResult
        position absolute
        left 50%
        top 50%
        transform translate3d(-50%,-50%,0)
</style>

