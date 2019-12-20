import { loginAPI } from "../../redux/actions/auth-actions/services"

describe('US26 loginAPI', () => {
    it('loginAPI_UTCID01', () => {
        // valid user 
        const user = {
            username: 'nguyenvy',
            password: 'Vy@123'
        }
        loginAPI(user).then(res => {
            expect(res.user.username).toEqual(user.username)
            expect(res.token).toBeDefined()
        })
    })

    it('loginAPI_UTCID02', () => {
        // invalid user
        const user = {
            username: 'AAAXXx',
            password: 'Vy@XXSS'
        }
        loginAPI(user).then(res => {
            expect(res).toEqual(400)
        })
    })

})