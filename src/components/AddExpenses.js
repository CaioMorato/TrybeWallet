import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DescriptionInput from './DescriptionInput';
import SelectPayment from './SelectPayment';
import ExpenseTag from './ExpenseTag';
import SelectCurrency from './SelectCurrency';
import '../styles/AddExpenses.css';
import * as actions from '../redux/actions';

class AddExpenses extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.sendExpense = this.sendExpense.bind(this);
    this.fetchAPI = this.fetchAPI.bind(this);

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'BRL',
      method: 'Cartão de Crédito',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  async fetchAPI() {
    const requestExchangeRates = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRatesJSON = await requestExchangeRates.json();
    const BRL = {
      ask: '1.00',
      code: 'BRL',
      codein: 'BRL',
      name: 'Real Brasileiro/Real Brasileiro',
      timestamp: 'always',
    };
    exchangeRatesJSON.BRL = BRL;

    this.setState((prevState) => ({
      ...prevState,
      exchangeRates: exchangeRatesJSON,
    }));
  }

  async sendExpense() {
    await this.fetchAPI();
    const { sendExpenseToState } = this.props;
    sendExpenseToState(this.state);
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: 'BRL',
      method: 'Cartão de Crédito',
      tag: 'Alimentação',
      exchangeRates: {},
    }));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <div className="form-container">
        <h2>Adicionar Despesa</h2>
        <form className="add-expenses-form" onSubmit={(e) => e.preventDefault()}>
          <div className="layer first-row">
            <DescriptionInput description={description} handleChange={this.handleChange} />
          </div>
          <div className="layer second-row">
            <label htmlFor="value">
              Valor:
              <input name="value" type="number" id="value" value={value} onChange={this.handleChange} />
            </label>
            <div>
              <SelectCurrency currencyValue={currency} handleChange={this.handleChange} />
            </div>
          </div>
          <div className="layer third-row">
            <SelectPayment method={method} handleChange={this.handleChange} />
          </div>
          <div className="layer fourth-row">
            <ExpenseTag tag={tag} handleChange={this.handleChange} />
          </div>
          <button className="add-expenses-button" type="submit" onClick={this.sendExpense}>
            Adicionar Despesa
          </button>
        </form>
      </div>
    );
  }
}

AddExpenses.propTypes = {
  sendExpenseToState: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  sendExpenseToState: (payload) => dispatch(actions.sendExpenses(payload)),
});

export default connect(null, mapDispatchToProps)(AddExpenses);
