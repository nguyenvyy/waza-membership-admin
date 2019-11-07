import { connect } from 'react-redux'
import { SelectVoucherModal } from '../../components/Combo/Modal/SelectVoucher'
import { fetchVouchers } from '../actions/voucherx-actions/actions'




const mapStateToProps = (state) => {
    let vouchers = state.voucherx.items
    if(state.voucherx.page === 9999) {
        vouchers = vouchers.filter(voucher => voucher.isDeleted !== true)
    }
    return {
        vouchers,
        isFetching: state.voucherx.isFetching,
        page: state.voucherx.page
    }
}


const mapDispatchToProps = {
    fetchVouchers
}

export const SelectVoucherContainer = connect(mapStateToProps, mapDispatchToProps)(SelectVoucherModal)

