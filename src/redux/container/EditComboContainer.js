import { connect } from 'react-redux'

import { featchDetailCombo } from '../actions/combo-actions/actions'
import EditCombo from '../../components/Combo/EditCombo/EditCombo'

const mapStateToProps = (state, ownProps) => {
    // const comboId = ownProps.match.params.id
    // const combo = getComboById(state, comboId)
    // const realIndex = getComboIndexById(state, comboId)
    return {combo: state.combo.detailCombo, isFetching: state.combo.isFetching}
}


const mapDispatchToProps = {
    featchDetailCombo
}

const EditComboContainer = connect(mapStateToProps, mapDispatchToProps)(EditCombo)
export default EditComboContainer