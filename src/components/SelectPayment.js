import React from 'react';
import PropTypes from 'prop-types';

export default class SelectPayment extends React.Component {
  render() {
    const { method, handleChange } = this.props;
    return (
      <select name="method" id="method" value={method} onChange={handleChange}>
        <option>Cartão de crédito</option>
        <option>Cartão de débito</option>
        <option>Dinheiro</option>
      </select>
    );
  }
}

SelectPayment.propTypes = {
  method: PropTypes.string,
  handleChange: PropTypes.func,
}.isRequired;
