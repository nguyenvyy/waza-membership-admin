import { createSelector } from 'reselect'

const getCombos = state => state.combo.items

const checkIsActiveCombo = combo => {
    if (combo.isDeleted) return !combo.isDeleted
    if (!combo.state) return combo.state
    const presentTime = Date.now();
    const fromDate = new Date(combo.fromDate).getTime()
    const toDate = new Date(combo.toDate).getTime()
    const isValidDay = (presentTime >= fromDate && presentTime <= toDate) ? true : false
    return isValidDay
}

export const getActiveCombos = createSelector(
    [getCombos],
    combos => combos.filter(() => true)
) 

