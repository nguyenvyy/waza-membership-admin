import { connect } from 'react-redux'

import { featchCombos, receiveDetailCombo, addPostCombo, stopPatchCombo, deletePatchCombo } from '../actions/combo-actions/actions'
import ManageCombo from '../../components/Combo/ManageCombo/ManageCombo'
import { getNoDeletedCombos } from '../selectors/combo-selector'

const mapStateToProps = (state) => {
    const combos = getNoDeletedCombos(state.combo)
    return {
        combos: combos,
        isFetching: state.combo.isFetching,
        page: state.combo.page
    }
}


const mapDispatchToProps = {
    featchCombos,
    receiveDetailCombo,
    addPostCombo,
    stopPatchCombo,
    deletePatchCombo
}

const ActiveComboContainer = connect(mapStateToProps, mapDispatchToProps)(ManageCombo)
export default ActiveComboContainer