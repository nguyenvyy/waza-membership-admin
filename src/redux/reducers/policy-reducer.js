
const initState = {
    combo: {
        voucherProprotions: [
            {
                name: '2V',
                value: [40, 60]
            },
            {
                name: '3V',
                value: [30, 30, 40]
            },
            {
                name: '4V',
                value: [25, 25, 25, 25]
            }
        ],
        priceProprotions: [
            {
                name: 'combo1',
                value: 30
            },
            {
                name: 'combo2',
                value: 40
            },
            {
                name: 'combo3',
                value: 50
            }
        ]

    },
    voucher: {

    }
}

export const policyReducer = (state = initState, action) => {
    switch (action.type) {
        default:
            return state
    }
}