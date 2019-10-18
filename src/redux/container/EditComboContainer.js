import { connect } from 'react-redux'

import { getComboById, getComboIndexById } from '../selectors/combo-selector'
import EditCombo from '../../components/Combo/EditCombo/EditCombo'

const mapStateToProps = (state, ownProps) => {
    const comboId = ownProps.match.params.id
    const combo = getComboById(state, comboId)
    const realIndex = getComboIndexById(state, comboId)
    return {combo, realIndex}
}


const mapDispatchToProps = {

}

const EditComboContainer = connect(mapStateToProps, mapDispatchToProps)(EditCombo)
export default EditComboContainer