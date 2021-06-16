<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center>
        <h2>购物街</h2>
      </template>
    </nav-bar>

    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
  // 只有用default导出的才可以去掉大括号
  import NavBar from 'components/common/navbar/NavBar.vue'
  import HomeSwiper from './childrenComps/HomeSwiper.vue'
  import RecommendView from './childrenComps/RecommendView.vue'
  import {
    getHomeMultiData
  } from "network/home"
  // import Swiper from 'components/common/swiper/Swiper'
  // import SwiperItem from 'components/common/swiper/SwiperItem'
  // import {
  //   Swiper,
  //   SwiperItem
  // } from 'components/common/swiper/index'
  export default {
    name: 'Home',
    components: {
      NavBar,
      // Swiper,
      // SwiperItem
      HomeSwiper,
      RecommendView
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    created() {
      // 1.请求多个数据
      getHomeMultiData().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
  }
</script>

<style>
  .home-nav {
    background-color: var(--color-tint);
  }
</style>