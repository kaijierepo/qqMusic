import {playMode} from 'common/js/config'
import {loadSearch,loadPlay} from 'common/js/catch.js'

export default {
    // 歌手信息
    singer:{},

    //播放状态
    playing:false,

    //是否折叠
    fullScreen:false,

    //播放列表
    playList:[],

    //顺序播放列表
    sequenceList:[],

    //播放状态
    mode:playMode.sequence,
    
    //当前歌曲idnex
    currentIndex:-1,

    //当前选中歌单信息
    disc:{},

    //当前榜单信息
    toplist:{},

    //搜索历史
    searchHistory:loadSearch(),

    //最近播放
    playHistory:loadPlay()
}