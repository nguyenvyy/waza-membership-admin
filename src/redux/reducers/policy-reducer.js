
const initState = {
    combo: [
        {
            name: 'CB01',
            increase: 30,
            voucherProprotion: [30, 30, 20],
            description: '...'
            
        },
        {
            name: 'CB02',
            increase: 30,
            voucherProprotion: [40, 60],
            description: '...'
            
        },
        {
            name: 'CB03',
            increase: 30,
            voucherProprotion: [25, 25, 25, 25],
            description: '...'
            
        },
        {
            name: 'CB04',
            increase: 30,
            voucherProprotion: [30, 30, 20],
            description: '...'
            
        },
        {
            name: 'CB05',
            increase: 35,
            voucherProprotion: [40, 60],
            description: '...'
            
        },
        {
            name: 'CB06',
            increase: 40,
            voucherProprotion: [25, 25, 25, 25],
            description: '...'
            
        }
    ],
    voucher: {

    }
}

export const policyReducer = (state = initState, action) => {
    switch (action.type) {
        default:
            return state
    }
}