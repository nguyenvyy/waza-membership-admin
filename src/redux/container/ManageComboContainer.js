import { connect } from 'react-redux'

import { featchCombos, receiveDetailCombo, addPostCombo, stopPatchCombo, deletePatchCombo } from '../actions/combo-actions/actions'
import { featchVouchers } from '../actions/voucherx-actions/actions'
import ManageCombo from '../../components/Combo/ManageCombo/ManageCombo'
// import { getNoDeletedCombos } from '../selectors/combo-selector'

const mapStateToProps = ({combo, voucherx}) => {
    const combos = combo.items
    const isMaxPageCombo = (combo.page >= combo.maxPage) ? true : false
    const isMaxPageVoucher = (voucherx.page >= voucherx.maxPage) ? true : false
    return {
        combos,
        isFetchingCombo: combo.isFetching,
        isMaxPageCombo,
        isFetchingVoucher: voucherx.isFetching,
        isMaxPageVoucher
    }
}


const mapDispatchToProps = {
    featchCombos,
    receiveDetailCombo,
    addPostCombo,
    stopPatchCombo,
    deletePatchCombo,
    featchVouchers
}

const ActiveComboContainer = connect(mapStateToProps, mapDispatchToProps)(ManageCombo)
export default ActiveComboContainer