/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'
import localforage from 'localforage'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior() {
		return {
			x: 0,
			y: 0
		}
	},
	routes: [

		{
			// =============================================================================
			// MAIN LAYOUT ROUTES
			// =============================================================================
			path: 'home',
			component: () => import('./layouts/main/Main.vue'),
			children: [
				// =============================================================================
				// Theme Routes
				// =============================================================================
				{
					path: '/home',
					name: 'home',
					component: () => import('./views/Home.vue'),
					meta: {
						guest: false,
						needsAuth: true,
						rule: 'admin'
					},
				},
				{
					path: '/products',
					name: 'products',
					component: () => import('./views/products/Product.vue'),
					meta: {
						breadcrumb: [{
								title: 'Home',
								url: '/'
							},
							{
								title: 'Data Products',
								active: true
							}
						],
						pageTitle: 'Products',
						guest: false,
						needsAuth: true,
						rule: 'admin'
					}
				},
				{
					path: '/products/:slug/edit',
					name: 'product-edit',
					component: () => import('./views/products/ProductEdit.vue'),
					meta: {
						breadcrumb: [{
								title: 'Home',
								url: '/'
							},
							{
								title: 'Data Products'
							},
							{
								title: 'Update Data Product',
								active: true
							}
						],
						pageTitle: 'Products',
						guest: false,
						needsAuth: true,
						rule: 'admin'
					}
				},
				{
					path: '/stocks',
					name: 'stocks',
					component: () => import('./views/stocks/Stock.vue'),
					meta: {
						breadcrumb: [{
								title: 'Home',
								url: '/'
							},
							{
								title: 'Live Stock',
								active: true
							}
						],
						pageTitle: 'Stocks',
						guest: false,
						needsAuth: true,
						rule: 'customer'
					},
				},
				{
					path: '/orders',
					name: 'orders',
					component: () => import('./views/orders/Order.vue'),
					meta: {
						breadcrumb: [{
								title: 'Home',
								url: '/'
							},
							{
								title: 'Orders',
								active: true
							}
						],
						pageTitle: 'Orders',
						guest: false,
						needsAuth: true,
						rule: 'admin'
					},
				},
				{
					path: '/orders/create',
					name: 'order-create',
					component: () => import('./views/orders/CreateOrder.vue'),
					meta: {
						breadcrumb: [{
								title: 'Home',
								url: '/'
							},
							{
								title: 'Orders',
								url: '/orders'
							},
							{
								title: 'Create Order',
								active: true
							}
						],
						pageTitle: 'Create Order',
						guest: false,
						needsAuth: true,
						rule: 'admin'
					},
				},
				{
					path: '/orders/:orderId/show',
					name: 'order-detail',
					component: () => import('./views/orders/OrderDetail.vue'),
					meta: {
						breadcrumb: [{
								title: 'Home',
								url: '/'
							},
							{
								title: 'Orders',
								url: '/orders'
							},
							{
								title: 'Order Detail',
								active: true
							}
						],
						pageTitle: 'Order Detail',
						guest: false,
						needsAuth: true,
						rule: 'admin'
					},
				},
				{
					path: '/customers',
					name: 'customers',
					component: () => import('./views/customers/Customer.vue'),
					meta: {
						breadcrumb: [{
								title: 'Home',
								url: '/'
							},
							{
								title: 'Customers',
								active: true
							}
						],
						pageTitle: 'Customer',
						guest: false,
						needsAuth: true,
						rule: 'admin'
					},
				},
				{
					path: '/returns',
					name: 'returns',
					component: () => import('./views/returns/Return.vue'),
					meta: {
						breadcrumb: [{
								title: 'Home',
								url: '/'
							},
							{
								title: 'Returns',
								active: true
							}
						],
						pageTitle: 'Returns',
						guest: false,
						needsAuth: true,
						rule: 'admin'
					},
				},
				{
					path: '/returns/:id/edit',
					name: 'returns-edit',
					component: () => import('./views/returns/ReturnEdit.vue'),
					meta: {
						breadcrumb: [{
								title: 'Home',
								url: '/'
							},
              {
								title: 'Returns',
								url: ''
							},
							{
								title: 'Edit',
								active: true
							}
						],
						pageTitle: 'Returns Edit',
						guest: false,
						needsAuth: true,
						rule: 'admin'
					},
				},
				{
					path: '/shipment/manual',
					name: 'shipment-manual',
					component: () => import('./views/shipment/ShipmentManual.vue'),
					meta: {
						breadcrumb: [{
								title: 'Home',
								url: '/'
							},
							{
								title: 'Shipment',
								url: ''
							},
							{
								title: 'Manual Generate',
								active: true
							}
						],
						pageTitle: 'Shipment',
						guest: false,
						needsAuth: true,
						rule: 'admin'
					},
				},
				{
					path: '/shipment/auto',
					name: 'shipment-auto',
					component: () => import('./views/shipment/ShipmentAuto.vue'),
					meta: {
						breadcrumb: [{
								title: 'Home',
								url: '/'
							},
							{
								title: 'Shipment',
								url: ''
							},
							{
								title: 'Auto Generate',
								active: true
							}
						],
						pageTitle: 'Shipment',
						guest: false,
						needsAuth: true,
						rule: 'admin'
					},
				},
				{
					path: '/location/provinces',
					name: 'Provinces',
					component: () => import('./views/location/Province.vue'),
					meta: {
						breadcrumb: [{
								title: 'Home',
								url: '/'
							},
							{
								title: 'Location',
							},
							{
								title: 'Provinces',
								active: true
							}
						],
						pageTitle: 'Provinces',
						guest: false,
						needsAuth: true,
						rule: 'public'
					},
				},
				{
					path: '/location/cities',
					name: 'Cities',
					component: () => import('./views/location/City.vue'),
					meta: {
						breadcrumb: [{
								title: 'Home',
								url: '/'
							},
							{
								title: 'Location',
							},
							{
								title: 'Cities',
								active: true
							}
						],
						pageTitle: 'Cities',
						guest: false,
						needsAuth: true,
						rule: 'admin'
					},
				},
				{
					path: '/location/subdistricts',
					name: 'Subdistricts',
					component: () => import('./views/location/Subdistrict.vue'),
					meta: {
						breadcrumb: [{
								title: 'Home',
								url: '/'
							},
							{
								title: 'Location',
							},
							{
								title: 'Subdistricts',
								active: true
							}
						],
						pageTitle: 'Subdistricts',
						guest: false,
						needsAuth: true,
						rule: 'admin'
					},
				},
				{
					path: '/report/cashflow',
					name: 'Cashflow',
					component: () => import('./views/report/cashflow/Cashflow.vue'),
					meta: {
						breadcrumb: [{
								title: 'Home',
								url: '/'
							},
							{
								title: 'Report',
							},
							{
								title: 'Cashflow',
								active: true
							}
						],
						pageTitle: 'Cashflow',
						guest: false,
						needsAuth: true,
						rule: 'admin'
					},
				},
			],
		},
		// =============================================================================
		// FULL PAGE LAYOUTS
		// =============================================================================
		{
			path: '',
			component: () => import('@/layouts/full-page/FullPage.vue'),
			children: [
				// =============================================================================
				// PAGES
				// =============================================================================
				{
					path: '/',
					name: 'login',
					component: () => import('@/views/auth/Login.vue'),
					meta: {
						guest: true,
						needsAuth: false,
						rule: 'public'
					}
				},
				{
					path: '/error-404',
					name: '404',
					component: () => import('@/views/error/Error404.vue'),
					meta: {
						guest: true,
						needsAuth: false,
						rule: '*'
					}
				},
			]
		},
		// Redirect to 404 page, if no match found
		{
			path: '*',
			redirect: '/error-404'
		}
	],
})

router.beforeEach((to, from, next) => {
	store.dispatch('auth/checkTokenExists').then(() => {
		if (to.meta.guest && to.name != 'home') {

			next({
				name: 'home'
			})
		}

		next()
	}).catch(() => {
		if (to.meta.needsAuth && to.name != 'login') {
			localforage.setItem('intended', to.name)
			next({
				name: 'login'
			})
		}

		next()
	})
})

router.afterEach(() => {
	// Remove initial loading
	const appLoading = document.getElementById('loading-bg')
	if (appLoading) {
		appLoading.style.display = "none";
	}
})

export default router
