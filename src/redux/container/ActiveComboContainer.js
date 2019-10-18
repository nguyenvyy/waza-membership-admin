import { connect } from 'react-redux'

import ActiveCombo from '../../components/Combo/ActiveCombo/ActiveCombo'

import { getActiveCombos } from '../selectors/combo-selector'
import { featchCombos, receiveDetailCombo } from '../actions/combo-actions/actions'

const mapStateToProps = (state) => {
    const combos = getActiveCombos(state)
    return {combos, isFetching: state.combo.isFetching}
}


const mapDispatchToProps = {
    featchCombos,
    receiveDetailCombo
}

const ActiveComboContainer = connect(mapStateToProps, mapDispatchToProps)(ActiveCombo)
export default ActiveComboContainer