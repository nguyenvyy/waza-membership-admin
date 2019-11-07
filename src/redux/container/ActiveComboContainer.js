import { connect } from 'react-redux'

import ActiveCombo from '../../components/Combo/ActiveCombo/ActiveCombo'

import { getActiveCombos } from '../selectors/combo-selector'
import { fetchCombos, receiveDetailCombo,stopPatchCombo } from '../actions/combo-actions/actions'
import { fetchVouchers } from '../actions/voucherx-actions/actions'

const mapStateToProps = ({combo, voucherx}) => {
    const combos = getActiveCombos(combo)
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
    fetchCombos,
    receiveDetailCombo,
    stopPatchCombo,
    fetchVouchers
}

const ActiveComboContainer = connect(mapStateToProps, mapDispatchToProps)(ActiveCombo)
export default ActiveComboContainer