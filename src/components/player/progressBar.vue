<template>
    <div class="progressBar" ref="progressBar" @click="progressClick">
        <div class="progress" ref="progress"></div>
        <div
            class="progressBtn"
            ref="progressBtn"
            @touchstart.self.prevent="touchStart"
            @touchmove.self.prevent="touchMove"
            @touchend="touchEnd"
        ></div>
    </div>
</template>
<script>
export default {
    props: {
        percent: {
            type: Number,
            default: 0
        }
    },
    created() {
        this.touch = {};
    },
    methods: {
        touchStart(e) {
            this.touch.initial = true;
            this.touch.startX = e.touches[0].pageX;
            this.touch.progressX = this.$refs.progress.clientWidth;
        },
        touchMove(e) {
            if (!this.touch.initial) {
                return;
            }
            let deltaX = e.touches[0].pageX - this.touch.startX;
            let offsetWidth = Math.min(
                Math.max(0, this.touch.progressX + deltaX),
                this.$refs.progressBar.clientWidth
            );
            this._offset(offsetWidth);
        },
        touchEnd() {
            this.touch.initial = false;
            this._precent();
        },
        progressClick(e) {
            let offsetWidth = e.pageX - this.$refs.progressBar.getBoundingClientRect().left
            // 点击小球时候出bug
            // let offsetWidth = e.offsetX;

            this._offset(offsetWidth);
            this._precent();
        },
        _precent() {
            let precent =
                this.$refs.progress.clientWidth /
                this.$refs.progressBar.clientWidth;
            this.$emit("precentChange", precent);
        },
        _offset(width) {
            this.$refs.progress.style.width = `${width}px`;
            this.$refs.progressBtn.style[
                "transform"
            ] = `translate3d(${width}px, -50%, 0)`;
            this.$refs.progressBtn.style[
                "-ms-transform"
            ] = `translate3d(${width}px, -50%, 0)`;
            this.$refs.progressBtn.style[
                "-moz-transform"
            ] = `translate3d(${width}px, -50%, 0)`;
            this.$refs.progressBtn.style[
                "-webkit-transform"
            ] = `translate3d(${width}px, -50%, 0)`;
        }
    },
    watch: {
        percent(val) {
            // 获取bar的长度
            let progressBarWidth = this.$refs.progressBar.clientWidth;
            //设置进度条的宽度
            let progressWidth = progressBarWidth * this.percent;
            this._offset(progressWidth);
        }
    }
};
</script>
<style lang="stylus" scoped>
@import '../../common/styles/variable.styl'
.progressBar
    width 100%
    height 4px
    background-color $color-background-d
    border-radius 4px
    position relative
    .progress
        height 4px
        border-radius 4px
        background-color $color-theme
        position absolute
    .progressBtn
        position absolute
        top 50%
        transform translate3d(0, -50%, 0)
        left -8px
        box-sizing border-box
        width 16px
        height 16px
        border-radius 12px
        border 4px solid #fff
        background-color $color-theme
</style>




