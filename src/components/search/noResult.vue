<template>
    <div class="noResultWrapper">
        {{title}}
    </div>
</template>
<script>
export default {
    props:{
        title:{
            type:String,
            default:'抱歉，没有搜索结果'
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '../../common/styles/variable.styl'
    .noResultWrapper
        text-align center
        font-size: $font-size-large-2x
        color: $color-text-d    
</style>