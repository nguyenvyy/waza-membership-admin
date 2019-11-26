import { connect } from 'react-redux'
import { ManageCompaign } from '../../components/Compaign/ManageCompaign/ManageCompaign'
import { fetchGiftVouchers } from '../actions/voucherx-actions/actions'
import { fetchFullCompaign } from '../actions/compain-actions/actions'
const mapProps = (state, ownProps) => {
    const { items,  isFetching} = state.compaign
    return {
        compaigns: items,
        isFetching
    }
}

const mapDispatch = {
    fetchGiftVouchers,
    fetchFullCompaign
}
export default connect(mapProps, mapDispatch)(ManageCompaign)