<template>
    <v-scroll
        class="singers"
        :data="singers"
        :listenScroll="true"
        @scroll="scroll"
        ref="singersList"
    >
        <ul>
            <li v-for="(group, index) in singers" :key="index" ref="group">
                <h1 class="title">{{ group.title }}</h1>
                <ul>
                    <li
                        v-for="singer in group.item"
                        :key="singer.id"
                        class="singer"
                        @click="selectSinger(singer)"
                    >
                        <img  v-lazy="singer.avatar" alt="" class="avatar" />
                        <span class="name">{{ singer.name }}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <!-- 右侧列表 -->
        <ul class="slide">
            <li
                v-for="(item, index) in slideList"
                :key="index"
                class="slideList"
                :class="{ active: currentIndex === index }"
                @touchstart="slideListStart(index, $event)"
                @touchmove.stop.prevent="slideListMove($event)"
                @touchend="slideListEnd"
            >
                {{ item }}
            </li>
        </ul>
        <div class="fixed-title" v-show="fixedTitle" ref="fixed">
            {{ fixedTitle }}
        </div>
    </v-scroll>
</template>
<script>
import scroll from "./scroll";
import {mapMutations} from 'vuex'
const TITLE_HEIGHT = 30;
export default {
    data() {
        return {
            touch: {},
            touchAction: false,
            timer: null,
            currentIndex: 0,
            scrollY: 0,
            groupList: [],
            heightList: [],
            diff: -1
        };
    },
    props: {
        singers: {
            type: Array
        }
    },
    methods: {
        ...mapMutations(['SET_SINGER']),
        refresh(){
            this.$refs.singersList.refresh()
        },
        selectSinger(singer) {
            this.$emit('selectSinger',singer)
            this.SET_SINGER(singer)
        },
        scroll(pos) {
            this.scrollY = pos.y | 0;
        },
        slideListStart(index, e) {
            let firstTouch = e.touches[0];
            this.touch.y1 = firstTouch.pageY;
            this.touch.firstIndex = index;
            this.touchAction = true;
            this._scrollto(index);
        },
        slideListMove(e) {
            if (this.touchAction) {
                let firstTouch = e.touches[0];
                this.touch.y2 = firstTouch.pageY;
                let delta = ((this.touch.y2 - this.touch.y1) / 20) | 0;
                let index = delta + parseInt(this.touch.firstIndex);
                this.currentIndex = index;

                this._scrollto(index);
            }
        },
        slideListEnd() {
            this.touchAction = false;
        },
        _scrollto(index) {
            if (!index && index !== 0) {
                return;
            }
            if (index < 0) {
                index = 0;
                this.currentIndex = index;
            } else if (index > this.heightList.length - 2) {
                index = this.heightList.length - 2;
                this.currentIndex = index;
            }
            this.$refs.singersList.scrollToElement(this.$refs.group[index], 0);
        },
        _groupList() {
            let groupLists = this.$refs.group;
            let height = 0;
            this.heightList.push(height);
            for (let i = 0; i < groupLists.length; i++) {
                let item = groupLists[i];
                height += item.clientHeight;
                this.heightList.push(height);
            }
        }
    },
    computed: {
        slideList() {
            let result = [];
            this.singers.map(item => {
                return result.push(item.title.substr(0, 1));
            });
            return result;
        },
        fixedTitle() {
            if (this.scrollY > 0) {
                return "";
            }

            return this.singers[this.currentIndex]
                ? this.singers[this.currentIndex].title
                : "";
        }
    },
    watch: {
        singers() {
            setTimeout(() => {
                this._groupList();
            }, 20);
        },
        scrollY(newY) {
            if (newY > 0) {
                this.currentIndex = 0;
                return;
            }

            for (let i = 0; i < this.heightList.length - 1; i++) {
                let height1 = this.heightList[i];
                let height2 = this.heightList[i + 1];
                if (-newY >= height1 && -newY < height2) {
                    this.currentIndex = i;
                    this.diff = height2 + newY;
                    return;
                }
            }
            this.currentIndex = this.heightList.length - 2;
        },
        diff(val) {
            let fixedTop =
                val > 0 && val < TITLE_HEIGHT ? val - TITLE_HEIGHT : 0;
            this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
        }
    },
    components: {
        "v-scroll": scroll
    }
};
</script>
<style lang="stylus" scoped>
@import '../common/styles/variable.styl'
.singers
    position relative
    width 100%
    height 100%
    overflow hidden
    .title
        line-height 0.6rem
        width 100%
        color $color-text-l
        background-color $color-highlight-background
        font-size $font-size-large-x
        text-indent 0.6rem
    .singer
        width 100%
        height 1.6rem
        display flex
        align-items center
        box-sizing border-box
        padding 0 0 0 0.4rem
        .avatar
            width 1rem
            height 1rem
            border-radius 1rem
            margin-right 0.24rem
        .name
            font-size $font-size-large-2x
            color $color-text-l
.slide
    position absolute
    right 0.2rem
    top 50%
    transform translate3d(0, -50%, 0)
    background-color $color-background-d
    z-index 10
    .slideList
        font-size $font-size-large-2x
        line-height 0.4rem
        color $color-text-l
        width 0.5rem
        text-align center
        &.active
            color $color-theme
.fixed-title
    position absolute
    top 0
    left 0
    width 100%
    line-height 0.6rem
    color $color-text-l
    background-color $color-highlight-background
    font-size $font-size-large-x
    text-indent 0.6rem
</style>
