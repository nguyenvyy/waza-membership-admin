import { connect } from 'react-redux'

import { featchDetailCombo, editPatchCombo } from '../actions/combo-actions/actions'
import EditCombo from '../../components/Combo/EditCombo/EditCombo'

const mapStateToProps = (state) => {
    return {combo: state.combo.detailCombo, isFetching: state.combo.isFetching}
}


const mapDispatchToProps = {
    featchDetailCombo,
    editPatchCombo
}

const EditComboContainer = connect(mapStateToProps, mapDispatchToProps)(EditCombo)
export default EditComboContainer