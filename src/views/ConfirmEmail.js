import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import commonStyles from '../config/commonStyles';

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    backgroundColor: commonStyles.primaryColor,    
  }
});

class ConfirmEmail extends Component {
  render() {
    return (
      <View
        style={styles.container}
      >
        <Text>Confirm Email</Text>
      </View>
    );
  }
}

export default ConfirmEmail;