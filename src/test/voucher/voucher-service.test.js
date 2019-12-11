import Axios from 'axios'
import {createVoucherToAPI} from '../../redux/actions/voucherx-actions/services'
import {getAllVouchers, getVoucherById, editVoucherByID, getAllRank} from '../../redux/actions/voucherx-actions/service-test'

describe('US test create voucher', () => {
    it('create voucher success', () => {
        const expectData = {
            voucher_name: 'voucher1',
            description: 'this is voucher 1',
            discount: 10,
            value: 100,
            from_date: 24/10/2019,
            to_date: 5/12/2019,
            state: true,
            category: 'gift',
            subcategory: 'food',
            times_to_use: 0, 
            rank: 0
        }
        return createVoucherToAPI({
            voucher_name: 'voucher1',
            description: 'this is voucher 1',
            discount: 10,
            value: 100,
            from_date: 24/10/2019,
            to_date: 5/12/2019,
            state: true,
            category: 'gift',
            subcategory: 'food',
            times_to_use: 0, 
            rank: 0
        },'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGFjM2FkNDY0NWI3MjAwMTc5MGNlNDciLCJpYXQiOjE1NzI3MTAzOTB9.dMQ6AYYwSwMc7iC0lJ_he_f-ASXf0Eys1VyVnPjb974').then(res => {
            expect(res).toBeDefined()
            expect(res.data).toEqual(expectData)
        })
    })
    it('create voucher fail when voucher name is existed', () => {
        const expectData = {
            message: 'Voucher name is existed'
        }
        return createVoucherToAPI({
            voucher_name: 'voucher1',
            description: 'this is voucher 1',
            discount: 10,
            value: 100,
            from_date: 24/10/2019,
            to_date: 5/12/2019,
            state: true,
            category: 'gift',
            subcategory: 'food',
            times_to_use: 0, 
            rank: 0 
        }).catch(err => {
            expect(err.response.data).toBeDefined()
            expect(err.response.data).toEqual(expectData)
        })
    })
})

describe('US Test get list vouchers', () => {
    it('get list vouchers success', () => {
        const expectData = [
            {
                "category": "gift",
                "createdAt": "2019-11-25T16:37:04.044Z",
                "description": "Description should not be null and has length between 50 and 1000 characters",
                "discount": 0,
                "from_date": "2019-11-26T00:00:00.000Z",
                "isDeleted": false,
                "rank": 0,
                "state": true,
                "subcategory": "shopping",
                "times_to_use": 0,
                "to_date": "2019-11-30T00:00:00.000Z",
                "updatedAt": "2019-11-25T16:37:04.044Z",
                "value": 10000,
                "voucher_name": "voucher rannnk 0",
                "__v": 0,
                "_id": "5ddc03300221710017ae947f"
            }     
        ]
        return getAllVouchers('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGFjM2FkNDY0NWI3MjAwMTc5MGNlNDciLCJpYXQiOjE1NzI3MTAzOTB9.dMQ6AYYwSwMc7iC0lJ_he_f-ASXf0Eys1VyVnPjb974')
        .then (res => {
            expect(res.data).toBeDefined()
            expect(res.data).toEqual(expectData)
        })
    })
    it('get list voucher fail', () => {
        const expectData = {
            "message": "Cannot't get list voucher"
        }
        return getAllVouchers('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGFjM2FkNDY0NWI3MjAwMTc5MGNlNDciLCJpYXQiOjE1NzI3MTAzOTB9.dMQ6AYYwSwMc7iC0lJ_he_f-ASXf0Eys1VyVnPjb975')
        .catch(err => {
            expect(err.response.data).toBeDefined()
            expect(err.response.data).toEqual(expectData)
        })
    })
})


describe('US Test get voucher by ID', () => {
    it('get voucher by ID successfully', () => {
        const expectData = {
            "category": "gift",
            "createdAt": "2019-11-25T16:37:04.044Z",
            "description": "Description should not be null and has length between 50 and 1000 characters",
            "discount": 0,
            "from_date": "2019-11-26T00:00:00.000Z",
            "isDeleted": false,
            "rank": 0,
            "state": true,
            "subcategory": "shopping",
            "times_to_use": 0,
            "to_date": "2019-11-30T00:00:00.000Z",
            "updatedAt": "2019-11-25T16:37:04.044Z",
            "value": 10000,
            "voucher_name": "voucher rannnk 0",
            "__v": 0,
            "_id": "5ddc03300221710017ae947f"
        }
        return getVoucherById('5ddc03300221710017ae947f', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGFjM2FkNDY0NWI3MjAwMTc5MGNlNDciLCJpYXQiOjE1NzI3MTAzOTB9.dMQ6AYYwSwMc7iC0lJ_he_f-ASXf0Eys1VyVnPjb974')
        .then (res => {
            expect(res.data).toBeDefined()
            expect(res.data).toEqual(expectData)
        })
    })
    it('get voucher by ID fail', () => {
        const expectData = {
            "message": "can't get voucher by ID"
        }
        return getVoucherById('abcdđef','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGFjM2FkNDY0NWI3MjAwMTc5MGNlNDciLCJpYXQiOjE1NzI3MTAzOTB9.dMQ6AYYwSwMc7iC0lJ_he_f-ASXf0Eys1VyVnPjb974')
        .catch(err => {
            expect(err.response.data).toBeDefined()
            expect(err.response.data).toEqual(expectData)
        })
    })
})

describe('edit voucher by ID', ()=> {
    it('describe edit voucher by ID success', () => {
        const expectData = 
            {
                "category": "gift",
                "createdAt": "2019-11-25T16:37:04.044Z",
                "description": "Description should not be null and has length between 50 and 1000 characters",
                "discount": 0,
                "from_date": "2019-11-26T00:00:00.000Z",
                "isDeleted": false,
                "rank": 0,
                "state": true,
                "subcategory": "shopping",
                "times_to_use": 0,
                "to_date": "2019-11-30T00:00:00.000Z",
                "updatedAt": "2019-11-25T16:37:04.044Z",
                "value": 10000,
                "voucher_name": "voucher rannnk 0",
                "__v": 0,
                "_id": "5ddc03300221710017ae947f"
            }
        return editVoucherByID({
            "category": "gift",
            "createdAt": "2019-11-25T16:37:04.044Z",
            "description": "Description should not be null and has length between 50 and 1000 characters",
            "discount": 0,
            "from_date": "2019-11-26T00:00:00.000Z",
            "isDeleted": false,
            "rank": 0,
            "state": true,
            "subcategory": "shopping",
            "times_to_use": 0,
            "to_date": "2019-11-30T00:00:00.000Z",
            "updatedAt": "2019-11-25T16:37:04.044Z",
            "value": 10000,
            "voucher_name": "voucher rannnk 0",
            "__v": 0,
            "_id": "5ddc03300221710017ae947f"
        },"5ddc03300221710017ae947f",'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGFjM2FkNDY0NWI3MjAwMTc5MGNlNDciLCJpYXQiOjE1NzI3MTAzOTB9.dMQ6AYYwSwMc7iC0lJ_he_f-ASXf0Eys1VyVnPjb974')
        .then(res => {
            expect(res.data).toBeDefined()
            expect(res.data).toEqual(expectData)
        })
    })
    it('describe edit vocher by ID fail', () => {
        const expectData = {
            "message":"Voucher name is existed"
        }
        return editVoucherByID({
            "category": "gift",
            "createdAt": "2019-11-25T16:37:04.044Z",
            "description": "Description should not be null and has length between 50 and 1000 characters",
            "discount": 0,
            "from_date": "2019-11-26T00:00:00.000Z",
            "isDeleted": false,
            "rank": 0,
            "state": true,
            "subcategory": "shopping",
            "times_to_use": 0,
            "to_date": "2019-11-30T00:00:00.000Z",
            "updatedAt": "2019-11-25T16:37:04.044Z",
            "value": 10000,
            "voucher_name": "voucher rannnk 0",
            "__v": 0,
            "_id": "5ddc03300221710017ae947f"
        },"5ddc03300221710017ae947f",'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGFjM2FkNDY0NWI3MjAwMTc5MGNlNDciLCJpYXQiOjE1NzI3MTAzOTB9.dMQ6AYYwSwMc7iC0lJ_he_f-ASXf0Eys1VyVnPjb974')
        .catch(err => {
            expect(err.response.data).toBeDefined()
            expect(err.response.data).toEqual(expectData)
        })
    })
})

describe('US38 get full rank from waza-reward service', () => {
    it('UTCID01 get full rank success', () => {
        const expectData = {
            "ranks": [
                {
                    "id": 1,
                    "name": "thành viên"
                },
                {
                    "id": 2,
                    "name": "bạc"
                },
                {
                    "id": 3,
                    "name": "vàng"
                }
            ]
        }
        return getAllRank()
            .then(res => {
                expect(res.data).toBeDefined()
                expect(res.data).toEqual(expectData)
            })
    })
})




