import React from 'react';

class ExpensesReport extends React.Component {
  render() {
    return (
      <table className="report-container">
        <tr>
          <th>Descrição</th>
          <th>Categoria</th>
          <th>Método de Pagamento</th>
          <th>Valor</th>
          <th>Taxa do Câmbio</th>
          <th>Valor Convertido</th>
          <th>Moeda de conversão</th>
        </tr>
      </table>
    );
  }
}
export default ExpensesReport;
