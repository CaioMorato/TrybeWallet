import React from 'react';
import WalletHeader from '../components/WalletHeader';
import AddExpenses from '../components/AddExpenses';
import ExpensesReport from '../components/ExpensesReport';
import '../styles/Wallet.css';
import '../styles/mediaQueries.css';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <WalletHeader />
        <main className="wallet-page-content">
          <AddExpenses />
          <ExpensesReport />
        </main>
      </>
    );
  }
}

export default Wallet;
