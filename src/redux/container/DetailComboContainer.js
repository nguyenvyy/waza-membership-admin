import { connect } from 'react-redux'
import { featchDetailCombo } from '../actions/combo-actions/actions'
import DetailCombo from '../../components/Combo/DetailCombo/DetailCombo'

const mapStateToProps = (state, ownProps) => {
    return {combo: state.combo.detailCombo, isFetching: state.combo.isFetching}
}


const mapDispatchToProps = {
    featchDetailCombo
}

const DetailComboContainer = connect(mapStateToProps, mapDispatchToProps)(DetailCombo)
export default DetailComboContainer