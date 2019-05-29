<template>
    <ul class="list">
        <li 
            v-for="(item, index) in switchObj" 
            :key="index" class="item" 
            :class="{'active':switchCurrentIndex === index}"
            @click.stop="selectSwitch(index)"
            >
            {{ item.name }}</li>
    </ul>
</template>
<script>
export default {
    props: {
        switchObj: {
            type: Array,
            default: []
        },
        switchCurrentIndex: {
            type: Number,
            default: 0
        }
    },
    methods:{
        selectSwitch(index){
            this.$emit('selectSwitch',index)
        }
    }
};
</script>
<style lang="stylus" scoped>
@import '../../common/styles/variable.styl'
@import '../../common/styles/mixin.styl'
    .list
        display flex
        margin-top .48rem
        .item
            flex 1
            font-size $font-size-large-3x
            color $color-dialog-background
            text-align center
            line-height .8rem
            &.active
                color $color-text 
</style>


