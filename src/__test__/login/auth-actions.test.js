import * as actions from '../../redux/actions/auth-actions/actions'
import * as types from '../../redux/actions/auth-actions/types'
import configureMockStore from 'redux-mock-store'
import moxios from 'moxios';
import thunk from 'redux-thunk'
import { serverURL } from '../../constant';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)   

describe('US26 requestLogin', () => {
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

    it('requestLogin_UTCID01', () => {
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
            { type: types.SEND_REQUEST_LOGIN },
            { type: types.STOP_REQUEST_LOGIN },
            {
                type: types.AUTHENTICATION_SUCCEEDED,
                user: dataMock
            },
        ]
        return store.dispatch(actions.requestLogin(validUser)).then((e) => {
            expect(store.getActions()).toEqual(expectedActions)
            expect(e).toBe(200)
        })

    })

    it('requestLogin_UTCID02', () => {
        const unValidUser = {username: "admxxin", password: "Dat@1xx23"}
        moxios.stubRequest(url, {
            status: 400
        })
        const expectedActions = [
            { type: types.SEND_REQUEST_LOGIN },
            { type: types.STOP_REQUEST_LOGIN }
        ]
        return store.dispatch(actions.requestLogin(unValidUser)).then((e) => {
            expect(store.getActions()).toEqual(expectedActions)
            expect(e).toBe(400)
        })

    })

})

