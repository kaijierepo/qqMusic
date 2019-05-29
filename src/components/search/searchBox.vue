<template>
    <div class="searchWrapper">
        <span class="iconsousuo iconfont"></span>
        <input type="text" class="input" :placeholder="placeholder" v-model="query">
        <span class="iconxianshi_quxiaotianchong iconfont" @click="clear" v-show="query"></span>
    </div>
</template>
<script>
import {debounce} from 'common/js/unit.js'
export default {
    props:{
        placeholder:{
            type:String,
            default:'搜索歌曲、歌手'
        }
    },
    data() {
        return {
            query:''
        };
    },
    methods: {
        clear() {
            this.query = "";
        },
        changeText(val) {
            this.query = val;
        }
    },
    created () {
       this.$watch('query',debounce((val) =>{
            this.$emit("quertChange", val);
       },200))
    },
    // watch: {
    //     query(val) {
    //         this.$emit("quertChange", val);
    //     }
    // } 
};
</script>
<style lang="stylus" scoped>
@import '../../common/styles/variable.styl'
.searchWrapper
    padding: 0 0.12rem
    height: 0.8rem
    border-radius: 0.12rem
    box-sizing: border-box
    width: 100%
    display: flex
    flex-direction: row
    font-size: $font-size-large-2x
    background-color: $color-highlight-background
    align-items: center
    .input
        flex: 1
        margin: 0 0.1rem
        line-height: 0.36rem
        background: $color-highlight-background
        color: #fff
        outline: 0
    .iconsousuo
        font-size: $font-size-large-3x
        margin-right: 0.24rem
        color: $color-background
    .iconxianshi_quxiaotianchong
        font-size: $font-size-large-3x
        color: $color-background
</style>

