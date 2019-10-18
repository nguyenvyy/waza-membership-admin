import { connect } from 'react-redux'
import DetailCombo from '../../components/Combo/DetailCombo/DetailCombo'
import { getComboById } from '../selectors/combo-selector'

const mapStateToProps = (state, ownProps) => {
    const comboId = ownProps.match.params.id
    const combo = getComboById(state, comboId)
    return {combo, isFetching: state.combo.isFetching}
}


const mapDispatchToProps = {

}

const DetailComboContainer = connect(mapStateToProps, mapDispatchToProps)(DetailCombo)
export default DetailComboContainer