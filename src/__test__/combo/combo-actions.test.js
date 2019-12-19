import * as actions from '../../redux/actions/combo-actions/actions'
import * as types from '../../redux/actions/combo-actions/types'
// import configureMockStore from 'redux-mock-store'
// import moxios from 'moxios';
// import thunk from 'redux-thunk'
// import { serverURL } from '../../constant';

// const middlewares = [thunk]
// const mockStore = configureMockStore(middlewares)

describe('US30 start request combo', () => {
    it('UTCID01', () => {
        const expectAction = {
            type: types.REQUEST_COMBOS
        }
        expect(actions.requestCombos()).toEqual(expectAction)
    })
})

describe('US30 stop request combo', () => {
    it('UTCID01', () => {
        const expectAction = {
            type: types.STOP_COMBOS_REQUEST
        }
        expect(actions.stopRequestCombos()).toEqual(expectAction)
    })
})