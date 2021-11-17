import React from 'react';
import { connect } from 'react-redux';
import './WalletHeader.css';

class WalletHeader extends React.Component {
	render() {
		const { getUserEmail } = this.props;

		return (
			<div className='mainContaierWalletHeader'>
				<p data-testid='email-field'>{getUserEmail}
        </p>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	getUserEmail: state.user.email,
});

export default connect(mapStateToProps)(WalletHeader);
