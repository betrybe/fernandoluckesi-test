import React from 'react';
import WalletHeader from '../../components/WalletHeader';
import './Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="mainContainerWallet">
        <WalletHeader />
      </div>
    );
  }
}

export default Wallet;
