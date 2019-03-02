import React, { Component } from 'react';
import {
  Animated,
  View,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ShakingView from './ShakingView';
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
  },
  nextButton: {
    textAlign: 'center',
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

  render() {
    const { children, errorState } = this.props;
    return (
      <ShakingView
        errorState={errorState}
      >
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
          <View
            style={styles.nextButtonContainer}
          >
            <Ionicons
              style={styles.nextButton}
              name='md-arrow-forward'
              color={commonStyles.primaryColor}
              size={commonStyles.iconSize}
            />
          </View>
        </Animated.View>
      </ShakingView>
    );
  }
}

export default TextInputContainer;