/**
 * 1、Vuex Store中由  state、getter、actions、mutations 四个对象参数 实例创建，
 * 2、通过commit 触发 mutations、dispatch 触发actions
 * 3、通过 install 注入 vue
 * 4、mutations 是唯一修改 state 途径， actions 用于提交mutation来改变状态，而不直接变更状态，可以包含任意异步操作
 * 5、导出 stroe、install 
 */

let _Vue = null
class Store {
	constructor({ state, getters, actions, mutations }) {
		this.state = state || {}
		this.mutations = mutations || {}
		this.actions = actions || {}
		const getters = getters || {}

		// 把 state 中的数据转为 响应式，这里的_Vue已经赋值为全局的Vue
		this.state = _Vue.observable(this.state)

		this.getters = Object.create(null)
		// 为 getters 添加一个 get 方法，这里就要使用 数据劫持
		Object.keys(getters).forEach((key) => {
			Object.defineProperty(this.getters, key, {
				// 为 this.getters 每一项都添加 一个 get 方法
				get: () => {
					return getters[key].call(this, this.state)
				},
			})
		})


		this.mutations = {}
		Object.keys(mutations).forEach((key) => {
			this.mutations[key] = (params) => {
				// 改变this指向 ，默认是要传入 state
				mutations[key].call(this, this.state, params)
			}
		})


		// actions
		this.actions = {}
		Object.keys(actions).forEach((key) => {
			this.actions[key] = (params) => {
				// 改变this指向 ，默认是要传入 store也就是 this
				actions[key].call(this, this, params)
			}
		})

	}

	// 第一个参数是事件名 ，第二个是参数
	commit = (eventName, params) => {
		this.mutations[eventName](params)
	}

	// dispatch
	// 第一个参数是事件名 ，第二个是参数
	dispatch = (eventName, params) => {
		this.actions[eventName](params)
	}

}

function install(Vue) {
	// 保存全局到 _Vue
	_Vue = Vue
	_Vue.mixin({
		beforeCreate() { // beforeCreate 生命周期
			if (this.$options.store) { // 判断Vue实例化是否以后store传入
				_Vue.prototype.$store = this.$options.store // 把 store 挂载到 Vue 原型上
			}
		},
	})
}

// 导出 install 和 Store
export default {
	install,
	Store,
}