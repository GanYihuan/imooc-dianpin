import { createStore } from 'redux'

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */


// 第一步：计算规则
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state
  }
}


// 第二步: 根据规则生成 store
// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counter);


// 第三步：定义数据变化后派发规则
// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.
store.subscribe(() =>
    console.log(store.getState())
);


// 第四步：触发规则变化
// 之后会跑到第一步去
// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });


// 第一步：计算规则
//  dianpin/app/reducers/userinfo.js
//  dianpin/app/reducers/store.js
//  dianpin/app/reducers/index.js

// 第二步: 根据规则生成 store
//  dianpin/app/store/configureStore.js

// 第三步：定义数据变化后派发规则
//  dianpin/app/index.jsx
//  dianpin/app/containers/Home/index : mapStateToProps()

// 第三步：定义数据变化后派发规则
// 第四步：触发规则变化
//  dianpin/app/containers/Home/index : mapDispatchToProps()
