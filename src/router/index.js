import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			component:resolve=>require(['../components/adminLogin'],resolve)
		},
		{
			path: '/tscg_system',
			component:resolve=>require(['../admin/tscg_system'],resolve),
			redirect: '/tscg_system/adminIndex',
			children: [
				{
					path: '/error404',				//errorinfo
					name: 'Error404',
					component:resolve=>require(['../admin/error404'],resolve)
				},
				{
					path: 'adminIndex',				//adminIndex
					name: 'adminIndex',
					component:resolve=>require(['../admin/adminIndex'],resolve)
				},
			/*-----------Store User----------*/
				{
					path: 'balanceOnHand',				//balanceOnHand
					name: 'balanceOnHand',
					component:resolve=>require(['../admin/store-user/balanceOnHand'],resolve)
				},
				{
					path: 'productForecast',				//productForecast
					name: 'productForecast',
					component:resolve=>require(['../admin/store-user/productForecast'],resolve)
				},
				{
					path: 'salesData',				//salesData
					name: 'salesData',
					component:resolve=>require(['../admin/store-user/salesData'],resolve)
				},
			/*-----------Store Management----------*/
				{
					path: 'store',				//store
          			name: 'storeList',
					component:resolve=>require(['../admin/store-management/store'],resolve)
				},
				{
					path: 'newStore',				//store
          			name: 'newStore',
					component:resolve=>require(['../admin/store-management/storeEditor'],resolve)
				},
				{
					path: 'editStore',				//store
          			name: 'editStore',
					component:resolve=>require(['../admin/store-management/storeEditor'],resolve)
				},
				{
					path: 'department',				//Department
					name: 'department',
					component:resolve=>require(['../admin/store-management/department'],resolve)
				},
				{
					path: 'cluster',				//Cluster
					name: 'cluster',
					component:resolve=>require(['../admin/store-management/cluster'],resolve)
				},
				{
					path: 'region',				//Cluster
					name: 'region',
					component:resolve=>require(['../admin/store-management/region'],resolve)
				},
			/*-----------Product Management----------*/
				{
					path: 'product',				//Product
					name: 'product',
					component:resolve=>require(['../admin/product-management/product'],resolve)
				},
				{
					path: 'productAdd',				//productAdd
					name: 'productAdd',
					component:resolve=>require(['../admin/product-management/productAdd'],resolve)
				},
				{
					path: 'productEdit',				//productEdit
					name: 'productEdit',
					component:resolve=>require(['../admin/product-management/productEdit'],resolve)
				},
				{
					path: 'commodity',				//Product
					name: 'commodity',
					component:resolve=>require(['../admin/product-management/commodity'],resolve)
				},
				{
					path: 'commodityAdd',				//commodityAdd
					name: 'commodityAdd',
					component:resolve=>require(['../admin/product-management/commodityAdd'],resolve)
				},
				{
					path: 'commodityEdit',				//commodityEdit
					name: 'commodityEdit',
					component:resolve=>require(['../admin/product-management/commodityEdit'],resolve)
				},
				{
					path: 'productStandard',				//commodityEdit
					name: 'productStandard',
					component:resolve=>require(['../admin/product-management/productStandard'],resolve)
				},
			/*-----------User Management----------*/	
				{
					path: 'user',				//User
					name: 'user',
					component:resolve=>require(['../admin/user-management/user'],resolve)
				},
				{
					path: 'addUser',				//addUser
					name: 'addUser',
					component:resolve=>require(['../admin/user-management/addUser'],resolve)
				},
				{
					path: 'editUser',				//editUser
					name: 'editUser',
					component:resolve=>require(['../admin/user-management/editUser'],resolve)
				},
				{
					path: 'role',				//role
					name: 'role',
					component:resolve=>require(['../admin/user-management/role'],resolve)
				},
				{
					path: 'editRole',				//editRole
					name: 'editRole',
					component:resolve=>require(['../admin/user-management/editRole'],resolve)
				},
				{
					path: 'addRole',				//addRole
					name: 'addRole',
					component:resolve=>require(['../admin/user-management/addRole'],resolve)
				},
			/*-----------Sales Data Management----------*/
				{
					path: 'salesDataManage',				//salesData
					name: 'salesDataManage',
					component:resolve=>require(['../admin/sales-data-management/salesData'],resolve)
				},

			/*-----------Reports Management----------*/
				{
					path: 'averageItemMovementReport',				//averageItemMovementReport
					name: 'averageItemMovementReport',
					component:resolve=>require(['../admin/reports-management/averageItemMovementReport'],resolve)
				},
				{
					path: 'itemsWithoutSalesReport',				//itemsWithoutSalesReport
					name: 'itemsWithoutSalesReport',
					component:resolve=>require(['../admin/reports-management/itemsWithoutSalesReport'],resolve)
				},
				{
					path: 'zeroBOHReport',				//zeroBOHReport
					name: 'zeroBOHReport',
					component:resolve=>require(['../admin/reports-management/zeroBOHReport'],resolve)
				},
				{
					path: 'highBOHReport',				//highBOHReport
					name: 'highBOHReport',
					component:resolve=>require(['../admin/reports-management/highBOHReport'],resolve)
				},
				{
					path: 'highDisplayStandardReport',				//highDisplayStandardReport
					name: 'highDisplayStandardReport',
					component:resolve=>require(['../admin/reports-management/highDisplayStandardReport'],resolve)
				},
				{
					path: 'toolUsageReport',				//toolUsageReport
					name: 'toolUsageReport',
					component:resolve=>require(['../admin/reports-management/toolUsageReport'],resolve)
				},

			]
		}
	]
})

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) { //匹配前往的路由不存在
    from.name ? next({
      name: from.name
    }) : next('/error404'); //判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
  } else {
    next(); //如果匹配到正确跳转
  }
});

export default router;

