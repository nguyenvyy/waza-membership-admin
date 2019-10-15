import { connect } from 'react-redux'
import ActiveCombo from '../../components/Combo/ActiveCombo/ActiveCombo'
import { getActiveCombos } from '../selectors/combo-selector'

const mapStateToProps = (state) => {
    const combos = getActiveCombos(state)
    return {combos}
}


const mapDispatchToProps = {

}

const ActiveComboContainer = connect(mapStateToProps, mapDispatchToProps)(ActiveCombo)
export default ActiveComboContainer