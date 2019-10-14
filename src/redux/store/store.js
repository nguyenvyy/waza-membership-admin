import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from '../reducers/root-reducer';
import thunk from 'redux-thunk';


export const configStore = (preloadedState) => {
    const middlware = [
        thunk
    ]

    const middlwareEnhancer = applyMiddleware(...middlware);
    
    const enhancer = [
        middlwareEnhancer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ]

    const composEnhancer = compose(...enhancer);
    const store = createStore(rootReducer, composEnhancer);
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('../reducers/root-reducer', () => store.replaceReducer(rootReducer))
    }
    return store;
}