import { createSelector } from 'reselect'
import moment from 'moment'

const getCombos = state => state.combo.items
const getComboIdFromProps = (_, id) => id

export const checkIsActiveCombo = combo => {
    if (combo.isDeleted) return !combo.isDeleted
    if (!combo.state) return combo.state
    const presentTime = Date.now();
    const fromDate = moment(combo.from_date, 'DD/MM/YYYY').valueOf()
    const toDate = moment(combo.to_date,'DD/MM/YYYY').valueOf()
    const isValidDay = (presentTime >= fromDate && presentTime <= toDate) ? true : false
    return isValidDay
}

const checkValidComboById = (combo, id) => combo.id.toString() === id

export const getActiveCombos = createSelector(
    [getCombos],
    combos => combos.filter(checkIsActiveCombo)
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
