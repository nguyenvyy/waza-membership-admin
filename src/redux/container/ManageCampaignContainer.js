import { connect } from 'react-redux'
import { ManageCampaign } from '../../components/Campaign/ManageCampaign/ManageCampaign'
import { fetchGiftVouchers } from '../actions/voucherx-actions/actions'
import { fetchFullCampaign } from '../actions/campaign-actions/actions'
const mapProps = (state, ownProps) => {
    const { items,  isFetching} = state.campaign
    return {
        campaigns: items,
        isFetching
    }
}

const mapDispatch = {
    fetchGiftVouchers,
    fetchFullCampaign
}
export default connect(mapProps, mapDispatch)(ManageCampaign)