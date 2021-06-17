// import Vue from 'vue'
// import VueRouter from 'vue-router'
import {
    createRouter,
    createWebHistory
} from 'vue-router'
const Home = () => import('views/home/Home.vue')
const Category = () => import('views/category/Category.vue')
const Cart = () => import('views/cart/Cart.vue')
const Profile = () => import('views/profile/Profile.vue')
// 1.安装插件
// Vue.useContext(VueRouter)
// 2.创建router
const routes = [{
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/profile',
        component: Profile
    }
]

const router = new createRouter({
    routes,
    history: createWebHistory()
})
export default router