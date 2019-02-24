import React, { Component } from 'react';
import {
  ScrollView,
  TextInput,
  StyleSheet,
  StatusBar,
} from 'react-native';
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
  }

  moveToNextField = (field) => {
    const { shownFieldIndex } = this.state;
    if (shownFieldIndex === 3) return;
    this.setState({ shownFieldIndex: shownFieldIndex + 1 }, () => {
      if (field) this.inputFields[field].focus();
    });
  };

  checkUsername = async () => {
    const { username } = this.state;
    const usernameRegex = /^[a-zA-Z0-9]{6,}$/;
    if (!username || !(username.match(usernameRegex))) {
      console.log('doesn\'t match');
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
      if (res.status === 400) {
        this.setState({ usernameExistsError: true });
        throw new Error('username already exists');
      }
      if (!res.ok) {
        throw new Error('error checking username');
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
      if (res.status === 400) {
        this.setState({ emailExistsError: true });
        throw new Error('an account with that email already exists');
      }
      if (!res.ok) {
        throw new Error('error checking emai');
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
    } = this.state;
    return (
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <RegistrationProgress 
          style={styles.registrationProgress}
          number={4}
          progress={shownFieldIndex}
        />
        {
          shownFieldIndex === 0 &&
          <TextInputContainer>
            <TextInput
              ref={(input) => this.inputFields['username'] = input}
              textContentType='username'
              onChangeText={(username) => this.setState({ username })}
              value={username}
              placeholder='Username'
              returnKeyType='next'
              onSubmitEditing={() => this.checkUsername()}
            />
          </TextInputContainer>
        }
        {
          shownFieldIndex === 1 &&
          <TextInputContainer>
            <TextInput
              ref={(input) => this.inputFields['email'] = input}
              textContentType='emailAddress'
              onChangeText={(email) => this.setState({ email })}
              value={email}
              placeholder='Email'
              returnKeyType='next'
              onSubmitEditing={() => this.checkEmail()}
            />
          </TextInputContainer>
        }
        {
          shownFieldIndex === 2 &&
          <TextInputContainer>
            <TextInput
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

export default Register;