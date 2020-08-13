import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reduxSaga from 'redux-saga'
import { all } from 'redux-saga/effects'


const sagaMiddlewear = reduxSaga()

const store = createStore(
  combineReducers({
    reducer,
  }),
  // инишл Стэйт
  composeWithDevTools(applyMiddleware(thunk, sagaMiddlewear))
);

sagaMiddlewear.run(
  function* () {
    yield all([
      // LoginSaga(),
    ])
  })



export default store;
