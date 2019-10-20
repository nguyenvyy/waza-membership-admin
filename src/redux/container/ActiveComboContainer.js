import { connect } from 'react-redux'

import ActiveCombo from '../../components/Combo/ActiveCombo/ActiveCombo'

import { getActiveCombos } from '../selectors/combo-selector'
import { featchCombos, receiveDetailCombo,stopPatchCombo } from '../actions/combo-actions/actions'

const mapStateToProps = (state) => {
    const combos = getActiveCombos(state.combo)
    return {combos,
        isFetching: state.combo.isFetching,
        page: state.combo.page
    }
}


const mapDispatchToProps = {
    featchCombos,
    receiveDetailCombo,
    stopPatchCombo
}

const ActiveComboContainer = connect(mapStateToProps, mapDispatchToProps)(ActiveCombo)
export default ActiveComboContainer