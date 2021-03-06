import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
// import validateInput from '../../../server/shared/validations/login';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {
    // Checks for any empty fields
    // const { errors, isValid } = validateInput(this.state);
    // if (!isValid) {
    //   this.setState({ errors });
    // }

    return true;
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.login(this.state).then(
      
      (res) => {
        var token = localStorage.getItem('jwtToken');
        if (token === null) {
          this.context.router.push('/signup')
        }
        else {
          this.context.router.push('/dashboard')
        }
      },
      (err) => {
        console.log('error');
      })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, identifier, password, isLoading } = this.state;

    return (
      <form className="well" onSubmit={this.onSubmit}>
        <h1 className="text-center">Login</h1>

        { errors.form && <div className="alert alert-danger">{errors.form}</div> }

        <TextFieldGroup
          field="identifier"
          label="Username / Email"
          value={identifier}
          error={errors.identifier}
          onChange={this.onChange}
        />

        <TextFieldGroup
          field="password"
          label="Password"
          value={password}
          error={errors.password}
          onChange={this.onChange}
          type="password"
        />

        <div className="form-group"><button className="center-block btn btn-primary btn-lg" disabled={isLoading}>Login</button></div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);