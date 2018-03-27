import { connect } from 'react-redux';
import Release from '../pages/release/Release'

const mapStateToProps = (state) => ({
	loginInfo: state.loginInfo
})

export default connect(mapStateToProps)(Release)