import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
} from 'react-native';
import applyScale from '../helpers/applyScale';

const styles = StyleSheet.create({
  container: {
    borderColor: '#000',
    borderWidth: applyScale(1),
    padding: applyScale(10),
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
    const { children } = this.props;
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
        {children}
      </Animated.View>
    );
  }
}

export default TextInputContainer;