<template>
    <!-- 父组件访问子组件 -->
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    // PC端无法鼠标实现拖动解决方法：把 mouseWheel: 设置为true就可以了！！！ 这框架真吐了  连个文档都没有！！！！
    import BScroll from 'better-scroll'
    // import ObserveDOM from '@better-scroll/observe-dom'
    // BScroll.use(ObserveDOM)
    export default {
        name: 'Scroll',
        props: {
            probeType: {
                type: Number,
                default: 0
            },
            pullUpLoad: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                scroll: null,
                message: '哈哈哈'
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.wrapper, {
                    click: true,
                    probeType: this.probeType,
                    pullUpLoad: this.pullUpLoad
                    // observeDOM: true,
                })
                // 监听滚动的位置
                this.scroll.on('scroll', (position) => {
                    this.$emit('scroll', position)
                })
                this.scroll.on('pullingUp', () => {
                    // console.log('上拉加载更多');
                    this.$emit('pullingUp')
                })

            });
        },
        methods: {
            scrollTo(x, y, time = 300) {
                this.scroll.scrollTo(x, y, time)
            },
            finishPullUp() {
                this.scroll.finishPullUp()
            },
            // refreshImage() {
            //     this.scroll.refresh()
            // }
        }
        // updated() {
        //     this.scroll.refresh()
        // },
        // activated() {
        //     this.scroll.refresh()
        // }
    }
</script>

<style scoped>

</style>