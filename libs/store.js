import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore,persistReducer } from 'redux-persist'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'
import { composeWithDevTools } from 'remote-redux-devtools';
import { AsyncStorage } from 'react-native'

import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
const initialState = {}
const enhancers = []
const loggerMiddleware = createLogger()
const middleware = [thunk, loggerMiddleware]
const config = {key: 'root',storage:AsyncStorage,stateReconciler: hardSet}

let reducer = persistReducer(config,rootReducer)

const composeEnhancers = typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined'?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(...middleware),...enhancers):compose(applyMiddleware(...middleware),...enhancers);

const store = createStore(reducer,initialState,composeEnhancers)

export const persistor = persistStore(store,null,()=> {store.getState()})

export default store