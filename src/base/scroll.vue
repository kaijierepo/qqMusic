<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>
<script>
import Bscroll from "better-scroll";
export default {
    props: {
        probeType: {
            type: Number,
            default: 3
        },
        click: {
            type: Boolean,
            default: true
        },
        data: {
            type: Array,
            default: null
        },
        listenScroll:{
            type:Boolean,
            default :false
        },
        pullup:{
            type:Boolean,
            default:false
        }
    },
    methods: {
        _initscroll() {
            if (!this.$refs.wrapper) {
                return;
            }
            this.scroll = new Bscroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click
            });
            if(this.listenScroll){
                this.scroll.on("scroll", (pos) => {
                    this.$emit("scroll",pos)
                })
            }
            if(this.pullup){
                this.scroll.on('scrollEnd',() => {
                    if(this.scroll.y  <= (this.scroll.maxScrollY + 50)){
                        this.$emit('scrollToEnd')
                    }
                })
            }
        },

        //代理better-scroll的enable方法
        enable() {
            this.scroll && this.scroll.enable();
        },
        //代理better-scroll的disable方法
        disable() {
            this.scroll && this.scroll.disable();
        },
        //代理better-scroll的refresh方法
        refresh() {
            this.scroll && this.scroll.refresh();
        },
        scrollTo() {
            //滚动到指定位置
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
        },
        scrollToElement() {
            //滚动到指定的目标元素。
            this.scroll &&
                this.scroll.scrollToElement.apply(this.scroll, arguments);
        }
    },
    mounted() {
        setTimeout(() => {
            this._initscroll();
        }, 20);
    },
    watch: {
        data() {
            setTimeout(() => {
                this.refresh();
            }, 20);
        }
    }
};
</script>



