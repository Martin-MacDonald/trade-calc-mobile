import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import TextInputContainer from '../../components/TextInputContainer';
import commonStyles from '../../config/commonStyles';

const styles = StyleSheet.create({
  container: commonStyles.container,
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      company: '',
      email: '',
      password: '',
      confirmPassword: '',
      shownFieldIndex: 0,
    };
    this.inputFields = {};
  }

  moveToNextField = (field) => {
    const { shownFieldIndex } = this.state;
    if (shownFieldIndex === 4) return;
    this.setState({ shownFieldIndex: shownFieldIndex + 1 }, () => {
      if (field) this.inputFields[field].focus();
    });
  };

  render() {
    const {
      name,
      company,
      email,
      password,
      confirmPassword,
      shownFieldIndex,
    } = this.state;
    return (
      <View
        style={styles.container}
      >
        {
          shownFieldIndex === 0 &&
          <TextInputContainer>
            <TextInput
              ref={(input) => this.inputFields['name'] = input}
              textContentType='name'
              onChangeText={(name) => this.setState({ name })}
              value={name}
              placeholder='Name'
              blurOnSubmit={false}
              returnKeyType='next'
              onSubmitEditing={() => this.moveToNextField('company')}
            />
          </TextInputContainer>
        }
        {
          shownFieldIndex === 1 &&
          <TextInputContainer>
            <TextInput
              ref={(input) => this.inputFields['company'] = input}
              onChangeText={(company) => this.setState({ company })}
              value={company}
              placeholder='Company'
              blurOnSubmit={false}
              returnKeyType='next'
              onSubmitEditing={() => this.moveToNextField('email')}
            />
          </TextInputContainer>
        }
        {
          shownFieldIndex === 2 &&
          <TextInputContainer>
            <TextInput
              ref={(input) => this.inputFields['email'] = input}
              textContentType='emailAddress'
              onChangeText={(email) => this.setState({ email })}
              value={email}
              placeholder='Email'
              blurOnSubmit={false}
              returnKeyType='next'
              onSubmitEditing={() => this.moveToNextField('password')}
            />
          </TextInputContainer>
        }
        {
          shownFieldIndex === 3 &&
          <TextInputContainer>
            <TextInput
              ref={(input) => this.inputFields['password'] = input}
              textContentType='password'
              onChangeText={(password) => this.setState({ password })}
              value={password}
              placeholder='Password'
              secureTextEntry
              blurOnSubmit={false}
              returnKeyType='next'
              onSubmitEditing={() => this.moveToNextField('confirmPassword')}
            />
          </TextInputContainer>
        }
        {
          shownFieldIndex === 4 &&
          <TextInputContainer>
            <TextInput
              ref={(input) => this.inputFields['confirmPassword'] = input}
              textContentType='password'
              onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
              value={confirmPassword}
              placeholder='Confirm Password'
              secureTextEntry
              blurOnSubmit={true}
              returnKeyType='done'
              onSubmitEditing={() => this.moveToNextField()}
            />
          </TextInputContainer>
        }
      </View>
    );
  }
}

export default Register;