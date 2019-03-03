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
      emailExistsError: false,
      password: '',
      confirmPassword: '',
      shownFieldIndex: 0,
    };
    this.inputFields = {};
    this.usernameFormatMessage = {
      title: 'Username Incorrect Format',
      message: 'Must be between 6 and 12 digits and only contain alphanumeric characters',
    };
    this.usernameExistsMessage = {
      title: 'Username Exists',
      message: 'Sorry but that username is already taken',
    };
  }

  moveToNextField = (field) => {
    const { shownFieldIndex } = this.state;
    if (shownFieldIndex === 3) return;
    this.setState({ shownFieldIndex: shownFieldIndex + 1 }, () => {
      if (field) this.inputFields[field].focus();
    });
  };

  checkUsername = async () => {
    this.props.toggleLoading();
    const { username } = this.state;
    const usernameRegex = /^[a-zA-Z0-9]{6,12}$/;
    if (!username || !(username.match(usernameRegex))) {
      this.setState({ usernameFormatError: true });
      return;
    }
    try {
      const res = await fetch(`${constants.apiURL}/user/checkUsername`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username })
      });
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
    }
  }

  checkEmail = async () => {
    const { email } = this.state;
    try {
      const res = await fetch(`${constants.apiURL}/user/checkEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });
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
    }
  }

  render() {
    const {
      username,
      email,
      password,
      confirmPassword,
      shownFieldIndex,
      usernameFormatError,
      usernameExistsError,
    } = this.state;
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
            />
          </TextInputContainer>
        }
        {
          shownFieldIndex === 1 &&
          <TextInputContainer>
            <TextInput
              style={styles.inputField}
              ref={(input) => this.inputFields['email'] = input}
              textContentType='emailAddress'
              onChangeText={(email) => this.setState({ email })}
              value={email}
              placeholder='Email'
              returnKeyType='next'
              onSubmitEditing={() => this.checkEmail()}
              autoCapitalize='none'
              keyboardType='email-address'
            />
          </TextInputContainer>
        }
        {
          shownFieldIndex === 2 &&
          <TextInputContainer>
            <TextInput
              style={styles.inputField}
              ref={(input) => this.inputFields['password'] = input}
              textContentType='password'
              onChangeText={(password) => this.setState({ password })}
              value={password}
              placeholder='Password'
              secureTextEntry
              returnKeyType='next'
              onSubmitEditing={() => this.moveToNextField('confirmPassword')}
            />
          </TextInputContainer>
        }
        {
          shownFieldIndex === 3 &&
          <TextInputContainer>
            <TextInput
              style={styles.inputField}
              ref={(input) => this.inputFields['confirmPassword'] = input}
              textContentType='password'
              onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
              value={confirmPassword}
              placeholder='Confirm Password'
              secureTextEntry
              returnKeyType='done'
              onSubmitEditing={() => this.moveToNextField()}
            />
          </TextInputContainer>
        }
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    toggleLoading,
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(Register);