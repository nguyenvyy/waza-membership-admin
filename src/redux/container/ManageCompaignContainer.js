import { connect } from 'react-redux'
import { ManageCompaign } from '../../components/Compaign/ManageCompaign/ManageCompaign'
import { fetchGiftVouchers } from '../actions/voucherx-actions/actions'
const mapProps = (state, ownProps) => {

    return {

    }
}

const mapDispatch = {
    fetchGiftVouchers
}
export default connect(mapProps, mapDispatch)(ManageCompaign)