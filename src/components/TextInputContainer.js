import React, { Component } from 'react';
import {
  Animated,
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
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