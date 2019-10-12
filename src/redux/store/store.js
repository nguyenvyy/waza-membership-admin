import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from '../reducers/root-reducer';


export const configStore = (preloadedState) => {
    const middlware = [

    ]

    const middlwareEnhancer = applyMiddleware(...middlware);

    const enhancer = [
        middlwareEnhancer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ]

    const composEnhancer = compose(...enhancer);
    const store = createStore(rootReducer, composEnhancer);

    // if (process.env.NODE_ENV !== 'production' && module.hot) {
    //     module.hot.accept('../reducers/root-reducers', () => store.replaceReducer(rootReducer))
    // }
    return store;
}