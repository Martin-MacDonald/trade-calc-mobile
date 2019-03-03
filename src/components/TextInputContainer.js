import React, { Component } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import applyScale from '../helpers/applyScale';
import commonStyles from '../config/commonStyles';

const stdStyles = {
  buttonWidth: applyScale(50),
};
const styles = StyleSheet.create({
  container: {
    borderColor: commonStyles.highlightColor,
    borderWidth: applyScale(1),
  },
  inputContainer: {
    paddingVertical: commonStyles.standardPadding,
    paddingLeft: commonStyles.standardPadding,
    paddingRight: stdStyles.buttonWidth + commonStyles.standardPadding,
  },
  nextButtonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    right: 0,
    height: '100%',
    width: stdStyles.buttonWidth,
    backgroundColor: '#fff',
    borderRadius: 0,
  },
  nextButton: {
    backgroundColor: 'transparent',
    height: '100%',
  }
});

class TextInputContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: new Animated.Value(-1000),
    };
  }

  componentDidMount() {
    Animated.spring(this.state.x, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }

  componentDidUpdate() {
    const { errorState, errorMessage } = this.props;
    if (errorState) {
      Alert.alert(
        errorMessage.title,
        errorMessage.message,
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
      );
    }
  }

  render() {
    const { children, loading } = this.props;
    return (
      <Animated.View
        style={[styles.container, {
          transform: [
            {
              translateX: this.state.x,
            }
          ]
        }]}
      >
        <View
          style={styles.inputContainer}
        >
          {children}
        </View>
        <Button
          containerStyle={styles.nextButtonContainer}
          buttonStyle={styles.nextButton}
          icon={
            <Ionicons
              name='md-arrow-forward'
              color={commonStyles.primaryColor}
              size={commonStyles.iconSize}
            />
          }
          loading={loading}
          loadingProps={{
            color: commonStyles.primaryColor
          }}
        />
      </Animated.View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
});

export default connect(mapStateToProps)(TextInputContainer);