import { connect } from 'react-redux'

import { featchDetailCombo, editPatchCombo } from '../actions/combo-actions/actions'
import EditCombo from '../../components/Combo/EditCombo/EditCombo'
import { featchVouchers } from '../actions/voucherx-actions/actions'

const mapStateToProps = ({combo, voucherx}) => {
    const isMaxPageVoucher = (voucherx.page >= voucherx.maxPage) ? true : false

    return {
        combo: combo.detailCombo, 
        isFetching: combo.isFetching,
        isFetchingVoucher: voucherx.isFetching,
        isMaxPageVoucher
    }
}


const mapDispatchToProps = {
    featchDetailCombo,
    editPatchCombo,
    featchVouchers
}

const EditComboContainer = connect(mapStateToProps, mapDispatchToProps)(EditCombo)
export default EditComboContainer