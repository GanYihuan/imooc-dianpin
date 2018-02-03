import {createStore} from 'redux';
import rootReducer from '../reducers';


// redux
// Second Step: Generate from Rule store
// rootReducer: General rules
export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState,
      // devToolsExtension: chrome' Development tools: React, Redux
      window.devToolsExtension ? window.devToolsExtension() : undefined
  );
  return store;
}