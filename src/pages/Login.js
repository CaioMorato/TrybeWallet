import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Login.css';
import wallet from '../images/wallet.png';
import svg from '../images/svg.svg';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.buttonHandler = this.buttonHandler.bind(this);
    this.emailSave = this.emailSave.bind(this);

    this.state = {
      email: '',
      password: '',
      buttonDisable: true,
    };
  }

  // abração ao saulo kirchmaier da turma 9 que me deu varios insights de como fazer o botão ficar desativado

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.buttonHandler();
      }
    );
  }

  buttonHandler() {
    const { email, password } = this.state;
    const validEmail = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
    const validPassword = new RegExp(/[\w\D]{6}/g);
    if (validEmail.test(email) && validPassword.test(password)) {
      this.setState({ buttonDisable: false });
    } else this.setState({ buttonDisable: true });
  }

  emailSave() {
    const { saveEmail } = this.props;
    const { email } = this.state;
    saveEmail(email);
  }

  render() {
    const { email, password, buttonDisable } = this.state;
    return (
      <main className="login-page">
        <div className="login-image">
          <img src={svg} alt="investment illustration" className="illustration" />

          {/* all credits from 'wallet' image to https://www.flaticon.com/authors/freepik */}
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="login-form">
          <div className="title">
            <img src={wallet} alt="" />
            <h1>Trybewallet</h1>
          </div>
          <label className="login-label" htmlFor="input-email">
            E-mail:
            <input name="email" onChange={this.handleChange} type="email" id="input-email" value={email} className="login-input" />
          </label>
          <label className="login-label" htmlFor="input-password">
            Senha:
            <input name="password" onChange={this.handleChange} type="password" id="input-password" value={password} className="login-input" />
          </label>
          <Link to="/carteira" className="button-container">
            <button type="submit" disabled={buttonDisable} onClick={this.emailSave} className={buttonDisable ? 'disabled-button' : 'enabled-button'}>
              Entrar
            </button>
          </Link>
        </form>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (payload) => dispatch({ type: 'USER_STATE', payload }),
});

Login.propTypes = {
  saveEmail: PropTypes.func,
}.isRequered;

export default connect(null, mapDispatchToProps)(Login);
