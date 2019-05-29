<template>
    <div class="loading-wrapper">
        <img src="./loading.gif" alt="" class="img">
        <span class="title">{{title}}</span>
    </div>
</template>
<script>
export default {
    props:{
        title:{
            type:String,
            default:'努力加载中'
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '../common/styles/variable.styl'
    .loading-wrapper
        display flex
        flex-direction column
        align-items center
        .img
            width 1.2rem
            height 1.2rem
        .title
            color $color-text-ll
            font-size $font-size-large-2x 
</style>


