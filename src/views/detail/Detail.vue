<template>
    <div id="detail">
        <detail-nav-bar></detail-nav-bar>
        <detail-swiper :top-images="topImages"></detail-swiper>
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar.vue'
    import DetailSwiper from './childComps/DetailSwiper.vue'

    import {
        getDetail
    } from 'network/detail'
    // import NavBar from 'components/common/navbar/NavBar.vue'
    export default {
        name: 'Detail',
        components: {
            DetailNavBar,
            DetailSwiper
            // NavBar
        },
        data() {
            return {
                iid: null,
                topImages: []
            }
        },
        created() {
            // console.log(this.$router.params.id);
            // 保存传入的iid
            this.iid = this.$route.params.iid
            // 根据iid请求数据
            getDetail(this.iid).then(res => {
                // 获取顶部的图片轮播数据
                console.log(res);
                this.topImages = res.result.itemInfo.topImages
            })
        }
    }
</script>

<style>

</style>