import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import AntStore from './reducers/AntStore';

const devtool = compose(
  window.devToolsExtension ? window.devToolsExtension() : func => func
)(createStore);

export default function() {
  const reducerCombo = combineReducers({
    AntStore,
  });
  const createStoreWithMiddleware = applyMiddleware(thunk)(devtool);
  return createStoreWithMiddleware(reducerCombo);
}
