<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <template #center>
        <h2>购物街</h2>
      </template>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" ref="tabControl1"
      :class="{fixed:isTabFixed}" v-show="isTabFixed">
    </tab-control>

    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3" :pull-up-load="true"
      @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2">
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  // 只有用default导出的才可以去掉大括号
  import HomeSwiper from './childrenComps/HomeSwiper.vue'
  import RecommendView from './childrenComps/RecommendView.vue'
  import FeatureView from './childrenComps/FeatureView.vue'

  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'

  import {
    debounce
  } from 'components/common/utils'
  import {
    getHomeMultiData,
    getHomeGoods
  } from "network/home"

  export default {
    name: 'Home',
    components: {
      NavBar,
      // Swiper,
      // SwiperItem
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {
            page: 0,
            list: []
          },
          'new': {
            page: 0,
            list: []
          },
          'sell': {
            page: 0,
            list: []
          }
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        // 639
        isTabFixed: false
      }
    },
    mounted() {
      // const refresh = this.debounce(this.$refs.scroll.refresh())
      // 获取tabControl的offsetTop属性
      // 所有的组件都有一个属性$el：用于获取组件中的元素
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultiData()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

      // 3.赋值
      this.tabOffsetTop = this.$refs.tabControl
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    destroyed() {
      console.log('home destroyed');
    },
    activated() {
      console.log('activated');
      this.$refs.scroll.refresh()
    },
    deactivated() {
      console.log('dectivated');
    },
    methods: {
      // 事件监听的相关方法
      // debounce(func, delay) {
      //   let timer = null
      //   return function (...args) {
      //     if (timer) clearTimeout(timer)
      //     timer = setTimeout(() => {
      //       func.apply(this.args)
      //     }, delay)
      //   }
      // },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick() {
        // console.log('回到顶部');
        this.$refs.scroll.scroll.scrollTo(0, 0, 3000);
        // this.$refs.scroll.message;
      },
      contentScroll(position) {
        // console.log(position);
        // 判断BackTop是否显示
        this.isShowBackTop = -position.y > 500
        // 决定tabControl是否吸顶（position：fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        // console.log('上拉加载更多');
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        console.log(this.$refs.tabControl2.$el.offsetTop);
      },
      // imageLoad() {
      //   this.$refs.scroll.scroll.refreshImage()
      // },
      // 网络请求相关的方法

      getHomeMultiData() {
        getHomeMultiData().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          this.$refs.scroll.finishPullUp()
          this.$refs.scroll.scroll.refresh()
        })
      }

    }
  }
</script>

<style scoped>
  #home {
    position: relative;
    /* padding-top: 44px; */
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    /* position: sticky; */
    /* top: 44px; */
    /* z-index: 9; */
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }

  .nav-bar {
    color: #fff;
  }

  /* .content {
    height: 100%;
    margin-top: 44px;
  } */
</style>