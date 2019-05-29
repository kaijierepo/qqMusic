<template>
    <ul>
        <li
            v-for="(song, index) in songs"
            :key="index"
            @click.stop="selectItem(song, index)"
            class="song"
            v-show="song.url"
        >
            <div class="left"  v-show="rank">
                <div
                    class="rank"
                    :class="getRankIcon(index)"
                    v-text="getRankText(index)"
                ></div>
            </div>
            <div class="right">
                <div class="name">{{ song.name }}</div>
                <div class="desc">{{ song.singer }}-{{ song.album }}</div>
            </div>
        </li>
    </ul>
</template>
<script>
export default {
    props: {
        songs: {
            type: Array,
            default: []
        },
        rank: {
            type: Boolean,
            default: false
        }
    },
    methods: {
      
        selectItem(song, index) {
            this.$emit("selectItem", song, index);
        },

          getRankIcon(index) {
            if(index <= 2) {
                return `icon${index}`
            }else{
                return 'text'
            }
        },
        getRankText(index) {
            if(index > 2){
                return index+1
            }
        }
    },
};
</script>
<style lang="stylus" scoped>
@import '../common/styles/variable.styl'
@import '../common/styles/mixin.styl'
.song
    padding: 0.24rem 0.24rem 0.24rem 0.48rem
    box-sizing: border-box
    display: flex
    .left
        flex: 0 0 0.5rem
        margin-right  .24rem
        display flex
        align-items center
        .rank
            width: 0.5rem
            height: 0.5rem
            background-size: 0.5rem 0.5rem
            background-repeat: no-repeat
            &.icon0
                bg-image('../common/img/first')
            &.icon1
                bg-image('../common/img/second')
            &.icon2
                bg-image('../common/img/third')
            &.text
                font-size $font-size-large-3x
                color $color-theme
                text-align center
    .right
        flex: 1
        .name
            font-size: $font-size-large-2x
            margin-bottom: 0.24rem
        .desc
            color: $color-text-d
            font-size: $font-size-large-2x

</style>


