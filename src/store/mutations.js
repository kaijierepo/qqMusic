import * as types from './mutations-types.js'

export default  {
    // 歌手
    [types.SET_SINGER](state, singer) {
        state.singer = singer;
    },
       
    //设置播放状态
    [types.SET_PLAYING](state,flag){
        state.playing = flag
    },

    //设置是否全屏显示
    [types.SET_FULLSCREEN](state,flag){
        state.fullScreen= flag
    },

    //设置播放列表
    [types.SET_PLAYLIST](state,list){
        state.playList = list
    },

    //设置顺序播放列表
    [types.SET_SEQUENCELIST](state,list){
        state.sequenceList = list
    },

    //设置播放列表播放状态
    [types.SET_MODE](state,mode){
        state.mode = mode
    },

    //设置当前歌曲idnex
    [types.SET_CURRENTINDEX](state,index){
        state.currentIndex = index
    },

    //设置当前歌单
    [types.SET_DISC](state,disc){
        state.disc = disc
    },

    //设置当前榜单
    [types.SET_TOP_LIST](state,toplist){
        state.toplist = toplist
    },

    //设置搜索历史
    [types.SET_SEARCH_HISTORY](state,history){
        state.searchHistory = history
    },

    //设置最近播放列表
    [types.SET_PLAY_HISTORY](state,history){
        state.playHistory = history
    }
}

