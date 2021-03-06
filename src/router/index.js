import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addShop = r => require.ensure([], () => r(require('@/page/addShop')), 'addShop');
const addGoods = r => require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const shopList = r => require.ensure([], () => r(require('@/page/shopList')), 'shopList');
const foodList = r => require.ensure([], () => r(require('@/page/foodList')), 'foodList');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');
const bannersList = r => require.ensure([], () => r(require('@/page/bannersList')), 'bannersList');
const addBanners = r => require.ensure([], () => r(require('@/page/addBanner')), 'addBanners');
const addCategory = r => require.ensure([], () => r(require('@/page/addCategory')), 'addCategory');
const categoryGoodsList = r => require.ensure([], () => r(require('@/page/categoryList')), 'categoryGoodsList');

const addKeywords = r => require.ensure([], () => r(require('@/page/addKeywords')), 'addKeywords');
const keywordsList = r => require.ensure([], () => r(require('@/page/keywordsList')), 'keywordsList');



const indexTypesList = r => require.ensure([], () => r(require('@/page/indexTypesList')), 'indexTypesList');
const addIndexType = r => require.ensure([], () => r(require('@/page/addIndextype')), 'addIndexType');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
            path: '/addCategory',
            component: addCategory,
            meta: ['添加数据', '添加类型'],
        },{
            path: '/addKeywords',
            component: addKeywords,
            meta: ['添加数据', '添加关键字'],
        }, {
			path: '/addShop',
			component: addShop,
			meta: ['添加数据', '添加商铺'],
		},{
			path: '/addGoods',
			component: addGoods,
			meta: ['添加数据', '添加商品'],
		},{
            path: '/addBanners',
            component: addBanners,
            meta: ['添加数据', '添加banner'],
        },{
            path: '/addIndexType',
            component: addIndexType,
            meta: ['添加数据', '添加首页分类'],
        },{
			path: '/userList',
			component: userList,
			meta: ['数据管理', '用户列表'],
		},{
			path: '/shopList',
			component: shopList,
			meta: ['数据管理', '商家列表'],
		},{
			path: '/foodList',
			component: foodList,
			meta: ['数据管理', '食品列表'],
		},{
			path: '/keywordsList',
			component: keywordsList,
			meta: ['数据管理', '关键字列表'],
		},{
            path: '/orderList',
            component: orderList,
            meta: ['数据管理', '订单列表'],
        },{
			path: '/adminList',
			component: adminList,
			meta: ['数据管理', '管理员列表'],
		},{
            path:'/bannersList',
            component: bannersList,
            meta: ['数据管理', '首页banner管理'],
        },{
            path:'/indexTypesList',
            component: indexTypesList,
            meta: ['数据管理', '首页分类管理'],
        },{
            path:'/categoryGoodsList',
            component: categoryGoodsList,
            meta: ['数据管理', '产品类型管理'],

        },{
			path: '/visitor',
			component: visitor,
			meta: ['图表', '用户分布'],
		},{
			path: '/newMember',
			component: newMember,
			meta: ['图表', '用户数据'],
		},{
			path: '/uploadImg',
			component: uploadImg,
			meta: ['文本编辑', 'MarkDown'],
		},{
			path: '/vueEdit',
			component: vueEdit,
			meta: ['编辑', '文本编辑'],
		},{
			path: '/adminSet',
			component: adminSet,
			meta: ['设置', '管理员设置'],
		},{
			path: '/sendMessage',
			component: sendMessage,
			meta: ['设置', '发送通知'],
		},{
			path: '/explain',
			component: explain,
			meta: ['说明', '说明'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
