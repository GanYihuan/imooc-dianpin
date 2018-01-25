import {createStore} from 'redux';
import rootReducer from '../reducers';


// redux
// 第二步: 根据规则生成 store
// rootReducer:总规则
export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState,
      // devToolsExtension: chrome 下的开发工具 React, Redux
      window.devToolsExtension ? window.devToolsExtension() : undefined
  );
  return store;
}