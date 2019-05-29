<template>
    <div>
        <h1 class="history" v-show="showTitle">
            <h1>搜索历史</h1>
            <span class="iconfont iconlajitong icon-del" @click="clearAll"></span>
        </h1>
        <ul class="lists">
            <li v-for="(item,index) in searchHistory" :key="index" class="list" @click="selectItem(item)">
               <span class="item">{{item}}</span>
                <span class="iconfont iconxianshi_quxiaotianchong" @click.stop="deleteItem(item)"></span>
            </li>
        </ul>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    props:{
        showTitle:{
            type:Boolean,
            default:true
        }
    },
    computed:{
        ...mapGetters(['searchHistory'])
    },
    methods: {
        deleteItem(item) {
            this.$emit('deleteItem',item)
        },
        clearAll(){
            this.$emit('clearAll')
        },
        selectItem(item){
            this.$emit('selectItems',item)
        }
    },
}
</script>
<style lang="stylus" scoped>
@import '../../common/styles/variable.styl'
@import '../../common/styles/mixin.styl'
    .history
        color $color-text-d
        font-size $font-size-large-2x 
        margin-bottom .48rem
        margin-top .24rem
        display flex
        align-items center
        justify-content space-between
    .lists
        .list
            display flex
            align-items center
            height .4rem
            line-height .4rem
            flex-direction row
            justify-content space-between
            margin-bottom .24rem
            &:last-child
                margin-bottom 0
            .item
                font-size $font-size-large-2x
                color $color-text-d
            .iconfont
                  line-height .4rem
                  color $color-text-d
                  font-size $font-size-large-3x
</style>

