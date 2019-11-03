import * as actions from '../redux/actions/auth-actions/actions'
import * as types from '../redux/actions/auth-actions/types'
import configureMockStore from 'redux-mock-store'
import moxios from 'moxios';
import thunk from 'redux-thunk'
import { serverURL } from '../constant';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('US22 login', () => {
    it('UTCID01', () => {
        const expectAction = {
            type: types.LOGIN
        }
        expect(actions.login()).toEqual(expectAction)
    })
})

describe('US22 save user info to store', () => {
    it('UTCID01', () => {
        const user = {
            user: {
                isDeleted: false,
                _id: '5dac3ad4645b72001790ce47',
                username: 'admin',
                createdAt: '2019-10-20T10:45:40.205Z',
                updatedAt: '2019-11-02T15:59:50.519Z',
                __v: 44,
            },
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGFjM2FkNDY0NWI3MjAwMTc5MGNlNDciLCJpYXQiOjE1NzI3MTAzOTB9.dMQ6AYYwSwMc7iC0lJ_he_f-ASXf0Eys1VyVnPjb974'
        }
        const expectAction = {
            type: types.AUTHENTICATION_SUCCEEDED,
            user
        }
        expect(actions.saveUser(user)).toEqual(expectAction)
    })
})

describe('US 22stop request', () => {
    it('UTCID01', () => {
        const expectAction = {
            type: types.STOP_LOGIN
        }

        expect(actions.stopLogin()).toEqual(expectAction)
    })
})

describe('US22 send request login', () => {
    let store
    let url
    beforeEach(() => {
        url = serverURL + '/admins/login'
        moxios.install();
        store = mockStore({
            info: null,
            isLoggedIn: false,
            isLoadingUser: false,
        });
    });

    afterEach(() => {
        moxios.uninstall();
    })

    it('UTCID01', () => {
        const validUser = {
            password: 'Dat@123',
            username: 'admin'
        }
        const dataMock = {
            user: {
                isDeleted: false,
                _id: '5dac3ad4645b72001790ce47',
                username: 'admin',
                createdAt: '2019-10-20T10:45:40.205Z',
                updatedAt: '2019-11-02T15:59:50.519Z',
                __v: 44,
            },
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGFjM2FkNDY0NWI3MjAwMTc5MGNlNDciLCJpYXQiOjE1NzI3MTAzOTB9.dMQ6AYYwSwMc7iC0lJ_he_f-ASXf0Eys1VyVnPjb974'
        }
        moxios.stubRequest(url, {
            status: 200,
            response: dataMock,
        })

        const expectedActions = [
            { type: types.LOGIN },
            {
                type: types.AUTHENTICATION_SUCCEEDED,
                user: dataMock
            },
            { type: types.STOP_LOGIN }
        ]


        return store.dispatch(actions.requestLogin(validUser)).then((e) => {
            expect(store.getActions()).toEqual(expectedActions)
        })

    })

    it('UTCID02', () => {
        const unValidUser = {username: "admxxin", password: "Dat@1xx23"}
        moxios.stubRequest(url, {
            status: 400
        })

        const expectedActions = [
            { type: types.LOGIN },
            { type: types.STOP_LOGIN }
        ]
        return store.dispatch(actions.requestLogin(unValidUser)).then((e) => {
            expect(store.getActions()).toEqual(expectedActions)
        })

    })

    it('UTCID03', () => {
        const validUser = {username: "admin", password: "Dat@123"}
        moxios.stubRequest(url, undefined)

        const expectedActions = [
            { type: types.LOGIN },
            { type: types.STOP_LOGIN }
        ]
        return store.dispatch(actions.requestLogin(validUser)).then((e) => {
            expect(store.getActions()).toEqual(expectedActions)
        })

    })

    
    it('UTCID04', () => {
        const unValidUser = {username: "admxxin", password: "Dat@1xx23"}
        moxios.stubRequest(url, undefined)

        const expectedActions = [
            { type: types.LOGIN },
            { type: types.STOP_LOGIN }
        ]
        return store.dispatch(actions.requestLogin(unValidUser)).then((e) => {
            expect(store.getActions()).toEqual(expectedActions)
        })

    })
})

describe('US24 send request logout', () => {
    let store
    let url
    beforeEach(() => {
        url = serverURL + '/admins/logout'
        moxios.install();
        store = mockStore({
            user: {
            info: {
                isDeleted: false,
                _id: '5dac3ad4645b72001790ce47',
                username: 'admin',
                createdAt: '2019-10-20T10:45:40.205Z',
                updatedAt: '2019-11-02T15:59:50.519Z',
                __v: 44,
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGFjM2FkNDY0NWI3MjAwMTc5MGNlNDciLCJpYXQiOjE1NzI3MTAzOTB9.dMQ6AYYwSwMc7iC0lJ_he_f-ASXf0Eys1VyVnPjb974'

            },
            isLoggedIn: true,
            isLoadingUser: false,}
        });
    });

    afterEach(() => {
        moxios.uninstall();
    })

    it('UTCID01', () => {
        moxios.stubRequest(url, {
            status: 200,
        })
        const expectedActions = [
            { type: types.LOGOUT }
        ]
        return store.dispatch(actions.requestLogout()).then((e) => {
            expect(store.getActions()).toEqual(expectedActions)
        })

    })
    it('UTCID02', () => {
        moxios.stubRequest(url, {
            status: 500,
        })
        const expectedActions = [
            { type: types.LOGOUT }
        ]
        return store.dispatch(actions.requestLogout()).then((e) => {
            expect(store.getActions()).toEqual(expectedActions)
        })

    })
    it('UTCID03', () => {
        moxios.stubRequest(url, undefined)
        const expectedActions = [
            { type: types.LOGOUT }
        ]
        return store.dispatch(actions.requestLogout()).then((e) => {
            expect(store.getActions()).toEqual(expectedActions)
        })

    })
})

