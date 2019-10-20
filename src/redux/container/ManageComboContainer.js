import { connect } from 'react-redux'

import { featchCombos, receiveDetailCombo, postCombo } from '../actions/combo-actions/actions'
import ManageCombo from '../../components/Combo/ManageCombo/ManageCombo'

const mapStateToProps = (state) => {
    return {
        combos: state.combo.items,
        isFetching: state.combo.isFetching,
        page: state.combo.page
    }
}


const mapDispatchToProps = {
    featchCombos,
    receiveDetailCombo,
    postCombo
}

const ActiveComboContainer = connect(mapStateToProps, mapDispatchToProps)(ManageCombo)
export default ActiveComboContainer