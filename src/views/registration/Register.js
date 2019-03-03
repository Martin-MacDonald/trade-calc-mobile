import React, { Component } from 'react';
import {
  ScrollView,
  TextInput,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleLoading } from '../../store/actions';
import TextInputContainer from '../../components/TextInputContainer';
import RegistrationProgress from '../../components/RegistrationProgress';
import constants from '../../config/constants';
import commonStyles from '../../config/commonStyles';
import applyScale from '../../helpers/applyScale';
import alert from '../../helpers/alert';
import {
  checkUsername,
  checkEmail,
  checkPassword,
} from '../../helpers/format';

const styles = StyleSheet.create({
  container: commonStyles.container,
  registrationProgress: {
    position: 'absolute',
    top: StatusBar.currentHeight + applyScale(30),
  },
  inputField: {
    color: commonStyles.highlightColor,
    fontSize: commonStyles.normalTextSize,
    letterSpacing: applyScale(1.5),
  },
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      usernameFormatError: false,
      usernameExistsError: false,
      email: '',
      emailFormatError: false,
      emailExistsError: false,
      password: '',
      passwordFormatError: false,
      confirmPassword: '',
      passwordMatchError: false,
      shownFieldIndex: 0,
    };
    this.inputFields = {};
    this.usernameFormatMessage = {
      title: 'Username Incorrect Format',
      message: 'Must be between 6 and 12 digits and only contain alphanumeric characters.',
    };
    this.usernameExistsMessage = {
      title: 'Username Exists',
      message: 'Sorry but that username is already taken.',
    };
    this.emailFormatMessage = {
      title: 'Email Incorrect Format',
      message: 'Please provide a valid email address to register.',
    };
    this.emailExistsMessage = {
      title: 'Email Exists',
      message: 'Sorry but that email is already linked to another account.',
    };
    this.passwordFormatMessage = {
      title: 'Password Incorrect Format',
      message: 'Passwords must be at least 8 characters with at least one lowercase and one uppercase letter and a digit.',
    };
    this.passwordMatchMessage = {
      title: 'Password Match Error',
      message: 'Your password confirmation does not match your password.',
    };
  }

  moveToNextField = (field) => {
    const { shownFieldIndex } = this.state;
    this.setState({ shownFieldIndex: shownFieldIndex + 1 }, () => {
      if (field) this.inputFields[field].focus();
    });
  };

  checkUsername = async () => {
    const { toggleLoading } = this.props;
    const { username } = this.state;
    if (!username || !checkUsername(username)) {
      this.setState({ usernameFormatError: true });
      return;
    }
    try {
      toggleLoading();
      const res = await fetch(`${constants.apiURL}/user/checkUsername`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username })
      });
      toggleLoading();
      if (res.status === 409) {
        this.setState({ usernameExistsError: true });
        return;
      }
      if (!res.ok) {
        throw new Error('unable to check username')
      }
      this.moveToNextField('email')
    } catch (err) {
      console.log(err);
      alert({
        title: 'Error',
        message: 'Unable to check username. Please check you are connected to the internet.'
      });
    }
  }

  checkEmail = async () => {
    const { toggleLoading } = this.props;
    const { email } = this.state;
    if (!email || !checkEmail(email)) {
      this.setState({ emailFormatError: true });
      return;
    }
    try {
      toggleLoading();
      const res = await fetch(`${constants.apiURL}/user/checkEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });
      toggleLoading();
      if (res.status === 409) {
        this.setState({ emailExistsError: true });
        return;
      }
      if (!res.ok) {
        throw new Error('unable to check email')
      }
      this.moveToNextField('password')
    } catch (err) {
      console.log(err);
      alert({
        title: 'Error',
        message: 'Unable to check email. Please check you are connected to the internet.'
      });
    }
  }

  checkPassword = async () => {
    const { password, confirmPassword, shownFieldIndex } = this.state;
    if (shownFieldIndex === 2) {
      if (!password || !checkPassword(password)) {
        this.setState({ passwordFormatError: true });
        return;
      }
      this.moveToNextField('confirmPassword')
    } else {
      if (!confirmPassword || password !== confirmPassword) {
        this.setState({ passwordMatchError: true });
        return;
      }
      this.register();
    }
  };

  register = async () => {
    const { username, email, password } = this.state;
    const { toggleLoading, navigation } = this.props;
    const user = {
      username,
      email,
      password,
    };
    try {
      toggleLoading();
      const res = await fetch(`${constants.apiURL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      });
      toggleLoading();
      if (!res.ok) {
        throw new Error('unable to register');
      }
      console.log('registered');
    } catch (err) {
      console.log(err);
      alert({
        title: 'Error',
        message: 'Unable to register. Please check you are connected to the internet.'
      });
    }
  };

  render() {
    const {
      username,
      email,
      password,
      confirmPassword,
      shownFieldIndex,
      usernameFormatError,
      usernameExistsError,
      emailFormatError,
      emailExistsError,
      passwordFormatError,
      passwordMatchError,
    } = this.state;
    const { loading } = this.props;
    return (
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: commonStyles.primaryColor }]}
      >
        <RegistrationProgress 
          style={styles.registrationProgress}
          number={4}
          progress={shownFieldIndex}
        />
        {
          shownFieldIndex === 0 &&
          <TextInputContainer
            errorState={usernameFormatError || usernameExistsError}
            errorMessage={usernameFormatError ? this.usernameFormatMessage : this.usernameExistsMessage}
            nextButtonPress={() => this.checkUsername()}
          >
            <TextInput
              style={styles.inputField}
              ref={(input) => this.inputFields['username'] = input}
              textContentType='username'
              onChangeText={(username) => this.setState({
                username, 
                usernameFormatError: false,
                usernameExistsError: false,
              })}
              value={username}
              placeholder='Username'
              returnKeyType='next'
              onSubmitEditing={() => this.checkUsername()}
              autoCapitalize='none'
              editable={!loading}
            />
          </TextInputContainer>
        }
        {
          shownFieldIndex === 1 &&
          <TextInputContainer
            errorState={emailFormatError || emailExistsError}
            errorMessage={emailFormatError ? this.emailFormatMessage : this.emailExistsMessage}
            nextButtonPress={() => this.checkEmail()}
          >
            <TextInput
              style={styles.inputField}
              ref={(input) => this.inputFields['email'] = input}
              textContentType='emailAddress'
              onChangeText={(email) => this.setState({
                email,
                emailFormatError: false,
                emailExistsError: false,
              })}
              value={email}
              placeholder='Email'
              returnKeyType='next'
              onSubmitEditing={() => this.checkEmail()}
              autoCapitalize='none'
              keyboardType='email-address'
              editable={!loading}
            />
          </TextInputContainer>
        }
        {
          shownFieldIndex === 2 &&
          <TextInputContainer
            errorState={passwordFormatError}
            errorMessage={this.passwordFormatMessage}
            nextButtonPress={() => this.checkPassword()}
          >
            <TextInput
              style={styles.inputField}
              ref={(input) => this.inputFields['password'] = input}
              textContentType='password'
              onChangeText={(password) => this.setState({
                password,
                passwordFormatError: false,
              })}
              value={password}
              placeholder='Password'
              secureTextEntry
              returnKeyType='next'
              onSubmitEditing={() => this.checkPassword()}
            />
          </TextInputContainer>
        }
        {
          shownFieldIndex === 3 &&
          <TextInputContainer
            errorState={passwordMatchError}
            errorMessage={this.passwordMatchMessage}
            nextButtonPress={() => this.checkPassword()}
          >
            <TextInput
              style={styles.inputField}
              ref={(input) => this.inputFields['confirmPassword'] = input}
              textContentType='password'
              onChangeText={(confirmPassword) => this.setState({
                confirmPassword,
                passwordMatchError: false,
              })}
              value={confirmPassword}
              placeholder='Confirm Password'
              secureTextEntry
              returnKeyType='done'
              onSubmitEditing={() => this.checkPassword()}
              editable={!loading}
            />
          </TextInputContainer>
        }
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    toggleLoading,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Register);