import { createSelector } from 'reselect'

const getCombos = state => state.combo.items
const getComboIdFromProps = (_, id) => id

const checkIsActiveCombo = combo => {
    if (combo.isDeleted) return !combo.isDeleted
    if (!combo.state) return combo.state
    const presentTime = Date.now();
    const fromDate = new Date(combo.fromDate).getTime()
    const toDate = new Date(combo.toDate).getTime()
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
