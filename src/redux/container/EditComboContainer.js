import { connect } from 'react-redux'

import { fetchDetailCombo, editPatchCombo } from '../actions/combo-actions/actions'
import EditCombo from '../../components/Combo/EditCombo/EditCombo'
import { fetchVouchers } from '../actions/voucherx-actions/actions'

import { fetchFullComboPolicy } from '../actions/policy-actions/action'

const mapStateToProps = ({combo, voucherx, policy}) => {
    const isMaxPageVoucher = (voucherx.page >= voucherx.maxPage) ? true : false

    return {
        combo: combo.detailCombo, 
        isFetching: combo.isFetching,
        isFetchingVoucher: voucherx.isFetching,
        isMaxPageVoucher,
        policies: policy.combo
    }
}


const mapDispatchToProps = {
    fetchDetailCombo,
    editPatchCombo,
    fetchVouchers,
    fetchFullComboPolicy
}

const EditComboContainer = connect(mapStateToProps, mapDispatchToProps)(EditCombo)
export default EditComboContainer