<template>
    <div class="headWrapper">
        <div class="head">
            <img src="./default.png" width="30" height="32" alt="" />
            <h1 class="title">Chicken Music</h1>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style lang="stylus" scoped>
@import '../../common/styles/variable.styl'
.headWrapper
    display flex
    line-height 0.88rem
    justify-content center
    .head
        display flex
        align-items center
        .title
            font-size $font-size-large-3x
            color $color-theme
            margin-left 0.24rem
</style>

