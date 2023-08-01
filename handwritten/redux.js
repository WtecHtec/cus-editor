/**
 * 简单redux：
 * 
 * 1、createStore。即通过 createStore，注入 Reducer 与 middleware, 默认state值，生成 Store 对象。
 * 
 * 2、Store 对象的 getState、subscribe 与 dispatch 函数。
 * getState 获取当前状态树，
 * subscribe 函数订阅状态树变更，接收一个函数，
 * dispatch 触发 Reducer。
 * 
 * 3、Reducer 是一个函数接收 action对象，以及 state 数据，经过数据处理state，最终返回新的state
 */


function createStore(reducer, initialState) {
	let state = { ...initialState }
	let listeners = [];

	function getState() {
		return state
	}

	function subscribe(listener) {
		if (typeof listener === 'function') {
			listeners.push(listener)
		}
	}

	function dispatch(action) {
		state = reducer(action, state)
		listeners.forEach(listener => listener())
	}
	return {
		getState,
		subscribe,
		dispatch,
	};
}


// 创建一个 reducer
function reducer(action, state = {},) {
	switch (action.type) {
		case 'INCREMENT':
			return { ...state, count: state.count + 1 };
		case 'DECREMENT':
			return { ...state, count: state.count - 1 };
		default:
			return state;
	}
}

const stroe = createStore(reducer, { count: 1 })
console.log(stroe.getState())

stroe.dispatch({ type: 'INCREMENT' })
console.log(stroe.getState())