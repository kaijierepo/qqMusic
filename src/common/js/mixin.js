import { mapGetters, mapMutations } from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from "common/js/unit.js";

export const playListMixin = {
    computed: {
        ...mapGetters(['playList'])
    },
    mounted() {
        this.handelPlaylist(this.playList)
    },
    activated() {
        this.handelPlaylist(this.playList)
    },
    watch: {
        playList(val) {
            this.handelPlaylist(this.playList)
        }
    },
    methods: {
        handelPlaylist() {

        }
    },
}

export const playModeMixin = {
    methods: {
        ...mapMutations(["SET_MODE","SET_CURRENTINDEX","SET_PLAYLIST","SET_PLAYING"]),
        //切换播放模式
        changeMode() {
            let mode = (this.mode + 1) % 3;
            this.SET_MODE(mode);
            let list = null;
            if (mode === playMode.random) {
                list = shuffle(this.sequenceList);
            } else {
                list = this.sequenceList;
            }
            this.resertSong(list);
            this.SET_PLAYLIST(list);
        },
        resertSong(list) {
                let index = list.findIndex(item => {
                    return item.id === this.currentSong.id;
                });
                this.SET_CURRENTINDEX(index);
            },
    },
    computed: {
        ...mapGetters(['sequenceList','currentSong','mode','playList']),
        modeText() {
            // return this.mode === playMode.sequence? '顺序播放' : this.mode === playMode.loop? '单曲循环' :'随机播放'
            if (this.mode === playMode.sequence) {
                return "顺序播放";
            } else if (this.mode === playMode.loop) {
                return "单曲循环";
            } else {
                return "随机播放";
            }
        },
        iconMode() {
            if (this.mode === playMode.sequence) {
                return "iconxunhuanbofang";
            } else if (this.mode === playMode.loop) {
                return "icondanquxunhuan";
            } else {
                return "iconsuijibofang";
            }
        },
    },
}