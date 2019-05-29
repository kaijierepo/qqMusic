import * as types from './mutations-types'
import { playMode } from 'common/js/config.js'
import { shuffle } from 'common/js/unit.js'
import {saveSearch,deleteSearch,clearSearch ,savePlay} from 'common/js/catch.js'
//点击歌曲后开始播放
export const selectPlay = function ({ commit, state }, { list, index }) {
    commit(types.SET_SEQUENCELIST, list)
    if (state.mode === playMode.random) {
        let randomList = shuffle(list)
        commit(types.SET_PLAYLIST, randomList)
        index = findSongIndex(randomList, list[index])
    } else {
        commit(types.SET_PLAYLIST, list)
    }
    commit(types.SET_CURRENTINDEX, index)
    commit(types.SET_FULLSCREEN, true)
    commit(types.SET_PLAYING, true)
}

// 点击随机播放大按钮
export const selectRandomPlay = function ({ commit }, { list }) {
    commit(types.SET_SEQUENCELIST, list)
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    commit(types.SET_CURRENTINDEX, 0)
    commit(types.SET_FULLSCREEN, true)
    commit(types.SET_PLAYING, true)
    commit(types.SET_MODE, playMode.random)
}

//点击搜索结果播放
export const selectSearchPlay = function ({ commit, state }, song) {
    
    let playList = state.playList.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex

    //获取当前播放歌曲
    let currentSong = playList[currentIndex]
    //因为是插入
    currentIndex++
    //查找当前播放列表有没有这个歌曲,
    let fpIndex = findSongIndex(playList, song)

    playList.splice(currentIndex, 0, song)

    if (fpIndex > -1) {
        if (currentIndex > fpIndex) {
            playList.splice(fpIndex, 1)
            currentIndex--
        } else {
            playList.splice(fpIndex + 1, 1)
        }
    }

    let currentSIndex = findSongIndex(sequenceList, currentSong) + 1

    let fsIndex = findSongIndex(sequenceList, song)

    sequenceList.splice(currentSIndex, 0, song)
    
    if (fsIndex > -1) {
        if (currentSIndex > fsIndex) {
            sequenceList.splice(fsIndex, 1)
        } else {
            sequenceList.splice(fsIndex + 1, 1)
        }
    }
    commit(types.SET_PLAYLIST, playList)
    commit(types.SET_SEQUENCELIST, sequenceList)
    commit(types.SET_CURRENTINDEX, currentIndex)
    commit(types.SET_FULLSCREEN, true)
    commit(types.SET_PLAYING, true)
}

export const saveSearchHistory = function({commit},query){
    commit(types.SET_SEARCH_HISTORY,saveSearch(query))
}

export const deleteSearchHistory = function({commit},query){
    commit(types.SET_SEARCH_HISTORY,deleteSearch(query))
}


export const clearSearchHistory = function({commit}){
    commit(types.SET_SEARCH_HISTORY,clearSearch())
}

//清空播放列表
export const clearPlayList = function({commit}){
    commit(types.SET_PLAYLIST,[])
    commit(types.SET_SEQUENCELIST,[])
    commit(types.SET_PLAYING,false)
    commit(types.SET_FULLSCREEN, false)
    commit(types.SET_CURRENTINDEX,-1)
}

//删除某个歌曲
export const deleteSongs = function({commit,state},song){
    let playList = state.playList.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex

    let pIndex =findSongIndex(playList,song)
    let sIndex =findSongIndex(sequenceList,song)

    playList.splice(pIndex,1)
    sequenceList.splice(sIndex,1)

    if(currentIndex > pIndex || currentIndex === playList.length) {
        currentIndex -- 
    }
    commit(types.SET_PLAYLIST,playList)
    commit(types.SET_SEQUENCELIST,sequenceList)
    commit(types.SET_CURRENTINDEX,currentIndex)
    if(!playList.length){
        commit(types.SET_PLAYING,false)
    }else {
        commit(types.SET_PLAYING,true)
    }
}

//加入最近播放列表
export const savePlayHistory = function({commit},song){
    // console.log(song)
    commit(types.SET_PLAY_HISTORY,savePlay(song))
}

function findSongIndex(list, song) {
    return list.findIndex((item) => {
        return item.id === song.id
    })
}