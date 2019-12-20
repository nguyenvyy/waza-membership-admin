import * as types from '../../../redux/actions/auth-actions/types'
import { authReducer } from '../../../redux/reducers/authen-reducer'

describe('US26, US29 change store of auth object', () => {
    let initState
    beforeEach(() => {
        initState = {
            info: null,
            isLoggedIn: false,
            isLoadingUser: false,
        }
    })
    
    it('authReducer_UTCID01', () => {
        expect(authReducer(initState, {})).toEqual(initState)
    })

    it('authReducer_UTCID02', () => {
        let expectedState = {
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
            isLoadingUser: false,
        }
        expect(authReducer(initState,
            {
                type: types.AUTHENTICATION_SUCCEEDED,
                user: {
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
            })).toEqual(expectedState)
    })

    it('authReducer_UTCID03', () => {
        expect(authReducer(initState, { type: types.STOP_REQUEST_LOGIN }).isLoadingUser).toBe(true)
    })

    it('authReducer_UTCID04', () => {
        expect(authReducer(initState, { type: types.SEND_REQUEST_LOGIN }).isLoadingUser).toBe(true)
    })

    it('authReducer_UTCID06', () => {
        const loggedInState = {
            info: {
                isDeleted: false,
                _id: '5dac3ad4645b72001790ce47',
                username: 'admin',
                createdAt: '2019-10-20T10:45:40.205Z',
                updatedAt: '2019-11-03T10:45:50.042Z',
                __v: 75,
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGFjM2FkNDY0NWI3MjAwMTc5MGNlNDciLCJpYXQiOjE1NzI3MTAzOTB9.dMQ6AYYwSwMc7iC0lJ_he_f-ASXf0Eys1VyVnPjb974'
            },
            isLoggedIn: true,
            isLoadingUser: false
        }

        const expectState = {
            info: null,
            isLoggedIn: false,
            isLoadingUser: false,
        }

        expect(authReducer(loggedInState, { type: types.LOGOUT })).toEqual(expectState)
    })
})