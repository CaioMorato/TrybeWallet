import React from 'react';
import WalletHeader from '../components/WalletHeader';
import AddExpenses from '../components/AddExpenses';
import ExpensesReport from '../components/ExpensesReport';
import '../styles/Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <WalletHeader />
        <main className="wallet-page">
          <AddExpenses />
          <ExpensesReport />
        </main>
      </>
    );
  }
}

export default Wallet;
