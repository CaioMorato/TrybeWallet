import React from 'react';
import { connect } from 'react-redux';
import '../styles/ExpensesReport.css';

class ExpensesReport extends React.Component {
  render() {
    const { expenses } = this.props;
    const BRLCurrency = {
      style: 'currency',
      currency: 'BRL',
    };

    return (
      <div className="report-container">
        <table>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Método de Pagamento</th>
            <th>Taxa do Câmbio</th>
            <th>Valor</th>
          </tr>
          {expenses.map((expense) => (
            <tr>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.exchangeRates[expense.currency].ask}</td>
              <td className="value-column">{(expense.exchangeRates[expense.currency].ask * expense.value).toLocaleString('pt-BR', BRLCurrency)}</td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpensesReport);
