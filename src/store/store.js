import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk";
import rootReducer from './reducers/index'

export default function configureStore() {
  let persistedState = {};
  return createStore(rootReducer, persistedState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}
