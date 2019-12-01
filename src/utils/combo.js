import { checkIsActiveCombo } from "../redux/selectors/combo-selector"
import { comboStatus } from "../constant/combo"

export const checkStatusCombo = combo => {
    switch (checkIsActiveCombo(combo)) {
        case comboStatus.deleted:
            return { text: comboStatus.deleted, processing: 'error' }
        case comboStatus.active:
            return { text: comboStatus.active, processing: 'processing' }
        case comboStatus.stop:
            return { text: comboStatus.stop, processing: 'default' }
        case comboStatus.wait:
            return { text: comboStatus.wait, processing: 'warning' }
        default:
            return { text: 'Unknown', processing: 'error' }
    }
}

export const objectConverttoArr = (selectedVouchers) => {
    const keys = Object.keys(selectedVouchers);
    return keys.map(key => selectedVouchers[key])
}

export const checkErrorSuccess = value => value ? 'success' : 'error'


export const calValueTotal = (comboValue, extraPersent, voucherPersent) => {
    const realValue = comboValue + (comboValue * extraPersent) / 100
    const result = (realValue * voucherPersent) / 100
    // debugger
    return result
}

export const calRealValueOfCombo = (comboValue, extraPersent) => {
    return comboValue + (comboValue * extraPersent) / 100
}