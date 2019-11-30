import { createSelector } from 'reselect'
import moment from 'moment'
import { comboStatus } from '../../constant/combo'
// handle combo
const getCombos = combo => combo.items
const getComboIdFromProps = (_, id) => id

export const checkIsActiveCombo = combo => {
    if (combo.isDeleted) return comboStatus.deleted
    if (!combo.state) return comboStatus.stop
    const presentTime = Date.now();
    const fromDate = moment(combo.from_date).valueOf()
    const toDate = moment(combo.to_date).valueOf()
    if(presentTime <= toDate) {
        if(presentTime < fromDate) {
            return comboStatus.wait
        } else {
            return comboStatus.active
        }
    }
    return comboStatus.stop
}

export const checkNoDeletedCombo = combo => {
    return !combo.isDeleted
}

const checkValidComboById = (combo, id) => combo._id.toString() === id.toString()

export const getActiveCombos = createSelector(
    [getCombos],
    combos => combos.filter(combo => checkIsActiveCombo(combo) === comboStatus.active)
)


export const getNoDeletedCombos = createSelector(
    [getCombos],
    combos => combos.filter(checkNoDeletedCombo)
)

export const getComboById = createSelector(
    [getCombos, getComboIdFromProps],
    (combos, id) => {
        return combos.find(combo => checkValidComboById(combo, id))
    }
)

export const getComboIndexById = createSelector(
    [getCombos, getComboIdFromProps],
    (combos, id) => {
        return combos.findIndex(combo => checkValidComboById(combo, id))
    }
)

//handle voucher in combo
