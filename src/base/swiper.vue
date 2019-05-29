<template>
    <div class="swiper-wrapper">
        <swiper :options="swiperOption" ref="mySwiper" class="imgWrapper">
            <!-- slides -->
            <swiper-slide v-for="item in recommends" :key="item.id">
                <a :href="item.linkUrl">
                    <img :src="item.picUrl" @load="load" alt="" class="img needsclick" />
                </a>
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
export default {
    name: "carrousel",
    props: {
        recommends: {
            type: Array
        }
    },
    data() {
        return {
            swiperOption: {
                autoplay: true,
                pagination: {
                    el: ".swiper-pagination"
                }
            }
        };
    },
    methods: {
        load() {
            this.$emit('load')   
        }
    },
   
};
</script>
<style lang="stylus" scoped>
@import '../common/styles/variable.styl'
.swiper-wrapper >>> .swiper-pagination-bullet-active
    background-color $color-theme
.imgWrapper
    width 100%
    height 0
    padding-bottom 40%
    overflow hidden
    background-color $color-background
    .img
        width 100%
</style>
