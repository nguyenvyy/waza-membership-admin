import { formatVND } from "../utils"

export const comboStatus = {
    deleted:  'Đã xóa',
    active: 'Đang hoạt động',
    stop: 'Đã dừng'

}

export const comboLimitValue = {
    days: {
        min: 30,
        max: 366
    },
    combo_name: {
        min: 6,
        max: 50
    },
    value: {
        min: 50000,
        max: 10000000
    },
    voucher_array: {
        min: 1
    },
    description: {
        min: 200,
        max: 1000
    }
    
}

export const errorMessage = {
    days: `The input must be an integer and from ${comboLimitValue.days.min} to ${comboLimitValue.days.max} day`,
    combo_name: `The input must be from ${comboLimitValue.combo_name.min} to ${comboLimitValue.combo_name.max} character and without special character`,
    value: `The input must be an integer, division by 1000 and from ${formatVND(comboLimitValue.value.min)} to ${formatVND(comboLimitValue.value.max)}`,
    voucher_array: `Number of vouchers must be greater than ${comboLimitValue.voucher_array.min}`,
    description: `The input must be from ${comboLimitValue.description.min} to ${comboLimitValue.description.max} character and without special character`,
}