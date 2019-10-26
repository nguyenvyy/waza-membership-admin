import { checkIsActiveCombo } from "../redux/selectors/combo-selector"
import { comboStatus } from "../constant/combo"

export const checkStatusCombo = combo => {
    if (combo.isDeleted) return { text: comboStatus.deleted, processing: 'error' }
    if (checkIsActiveCombo(combo))
        return { text: comboStatus.active, processing: 'processing' }
    else
        return { text: comboStatus.stop, processing: 'warning' }
}

export const objectConverttoArr = (selectedVouchers) => {
    const keys = Object.keys(selectedVouchers);
    return keys.map(key => selectedVouchers[key])
}