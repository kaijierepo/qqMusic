<template>
    <div class="tabsWrapper">
        <router-link to="./recommend" class="tabs">推荐</router-link>
        <router-link to="./singer" class="tabs">歌手</router-link>
        <router-link to="./ranking" class="tabs">排行</router-link>
        <router-link to="./search" class="tabs">搜索</router-link>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="stylus" scoped>
@import '../../common/styles/variable.styl'
    .tabsWrapper
        display flex
        align-items center
        line-height .88rem
        top .88rem
        left 0
        right 0
        background-color $color-background
        .tabs 
            flex 1
            font-size $font-size-large-2x
            text-align center
            position relative
            &.active
                color $color-theme
                &:before
                    position absolute
                    content ''
                    width 50%
                    height .05rem
                    background-color $color-theme
                    border-radius .1rem
                    top auto
                    left 25%
                    right 25%
                    bottom .15rem
</style>


