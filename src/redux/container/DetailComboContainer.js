import { connect } from 'react-redux'
import { fetchDetailCombo } from '../actions/combo-actions/actions'
import DetailCombo from '../../components/Combo/DetailCombo/DetailCombo'
import { fetchVouchers } from '../actions/voucherx-actions/actions'

const mapStateToProps = ({combo, voucherx}, ownProps) => {
    
    const isMaxPageVoucher = (voucherx.page >= voucherx.maxPage) ? true : false
    return {
        combo: combo.detailCombo, 
        isFetching: combo.isFetching,
        isFetchingVoucher: voucherx.isFetching,
        isMaxPageVoucher
    }
}


const mapDispatchToProps = {
    fetchDetailCombo,
    fetchVouchers
}

const DetailComboContainer = connect(mapStateToProps, mapDispatchToProps)(DetailCombo)
export default DetailComboContainer