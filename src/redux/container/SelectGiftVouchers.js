import { connect } from 'react-redux'
import { SelectMultiVouchers } from '../../components/Combo/Modal/SelectMultiVouchers'




const mapStateToProps = (state) => {
    return {
        vouchers : state.voucherx.giftItems,
        isFetching: state.voucherx.isFetching
    }
}


export const SelectGiftVouchers = connect(mapStateToProps, undefined)(SelectMultiVouchers)

