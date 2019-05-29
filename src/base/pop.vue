<template>
    <transition name="fade">
        <div class="pop-bg">
            <div class="pop">
                <h1 class="title border-bottom">{{ title }}</h1>
                <div class="btn">
                    <div class="cancel border-right" @click.stop="cancelPop">
                        {{ cancel }}
                    </div>
                    <div class="clear" @click.stop="clearSearch">{{ clear }}</div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: "是否清空所有搜索记录"
        },
        cancel: {
            type: String,
            default: "取消"
        },
        clear: {
            type: String,
            default: "清空"
        }
    },
    methods: {
        cancelPop() {
            this.$emit("cancel");
        },
        clearSearch() {
            this.$emit("clear");
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '../common/styles/variable.styl'
.fade-enter-active, .fade-leave-active
    transition all 0.3s
.fade-enter, .fade-leave-to
    opacity 0
.pop-bg
    position fixed
    left 0
    top 0
    right 0
    bottom 0
    background-color $color-background-d
    z-index 1998
    .pop
        position absolute
        left 50%
        top 50%
        transform translate3d(-50%, -50%, 0)
        background-color $color-dialog-background
        width 270px
        border-radius 0.1rem
        .title
            font-size $font-size-large-3x
            color $color-text-ll
            text-align center
            line-height 50px
        .border-bottom::before
            border-color $color-background
        .btn
            display flex
            flex-direction row
            .cancel, .clear
                font-size $font-size-large-3x
                color $color-text-ll
                width 50%
                text-align center
                line-height 50px
            .clear
                border-color $color-background
            .border-right::before
                border-color $color-background
</style>



