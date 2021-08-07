import React from 'react';
import PropTypes from 'prop-types';
import '../styles/AddExpenses.css';

export default class SelectCurrency extends React.Component {
  constructor() {
    super();

    this.fetchCurrencyList = this.fetchCurrencyList.bind(this);

    this.state = {
      newCurrencyList: [],
    };
  }

  componentDidMount() {
    this.fetchCurrencyList();
  }

  async fetchCurrencyList() {
    const fetchAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const apiJSON = await fetchAPI.json();
    const BRL = {
      ask: '1.00',
      code: 'BRL',
      codein: 'BRL',
      name: 'Real Brasileiro/Real Brasileiro',
      timestamp: 'always',
    };
    apiJSON.BRL = BRL;
    const currencyList = Object.values(apiJSON);
    const newCurrencyList = currencyList
      .sort((a, b) => {
        if (a.code > b.code) {
          return 1;
        } else if (a.code < b.code) {
          return -1;
        }
        return 0;
      })
      .filter((currency) => currency.code !== 'USDT' && currency.codein !== 'BRLT');
    this.setState({
      newCurrencyList,
    });
  }

  render() {
    const { newCurrencyList } = this.state;
    const { currencyValue, handleChange } = this.props;
    return (
      <label htmlFor="currency">
        <select name="currency" id="currency" onChange={handleChange} value={currencyValue}>
          {newCurrencyList
            .filter((currency) => currency.code !== 'USDT')
            .map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
              </option>
            ))}
        </select>
      </label>
    );
  }
}

SelectCurrency.propTypes = {
  currencyValue: PropTypes.string,
  handleChange: PropTypes.func,
}.isRequired;
