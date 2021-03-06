import React from 'react';
import PropTypes from 'prop-types';

export default class ExpenseTag extends React.Component {
  render() {
    const { tag, handleChange } = this.props;
    return (
        <select name="tag" id="tag" value={ tag } onChange={ handleChange }>
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>

    );
  }
}

ExpenseTag.propTypes = {
  tag: PropTypes.string,
  handleChange: PropTypes.func,
}.isRequired;
