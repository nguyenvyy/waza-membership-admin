import { connect } from 'react-redux'

import { fetchDetailCombo, editPatchCombo } from '../actions/combo-actions/actions'
import EditCombo from '../../components/Combo/EditCombo/EditCombo'
import { fetchVouchers } from '../actions/voucherx-actions/actions'

import { fetchFullComboPolicy } from '../actions/policy-actions/action'
import { getActivePolicySelector } from '../selectors/policy-selector'

const mapStateToProps = ({combo, voucherx, policy}) => {
    const isMaxPageVoucher = (voucherx.page >= voucherx.maxPage) ? true : false
    const policies = getActivePolicySelector(policy.combo)
    return {
        combo: combo.detailCombo, 
        isFetching: combo.isFetching,
        isFetchingVoucher: voucherx.isFetching,
        isMaxPageVoucher,
        policies
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