import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';

class ShakingView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      animatedValue: new Animated.Value(0),
    };
  }

  handleAnimation = () => {
    const { animatedValue } = this.state;
    Animated.sequence([
      Animated.timing(animatedValue, {toValue: 1.0, duration: 50, easing: Easing.linear, useNativeDriver: true}),
      Animated.timing(animatedValue, {toValue: -1.0, duration: 100, easing: Easing.linear, useNativeDriver: true}),
      Animated.timing(animatedValue, {toValue: 0.0, duration: 50, easing: Easing.linear, useNativeDriver: true}),
      Animated.timing(animatedValue, {toValue: 1.0, duration: 50, easing: Easing.linear, useNativeDriver: true}),
      Animated.timing(animatedValue, {toValue: -1.0, duration: 100, easing: Easing.linear, useNativeDriver: true}),
      Animated.timing(animatedValue, {toValue: 0.0, duration: 50, easing: Easing.linear, useNativeDriver: true}),
    ])
    .start(); 
  }

  componentDidUpdate() {
    const { errorState } = this.props;
    if (errorState) {
      this.handleAnimation();
    }
  }

  render() {
    const { children } = this.props;
    const { animatedValue } = this.state;
    return (
      <Animated.View
        onAnimate={() => this.handleAnimation()}
        style={{
          transform: [{
            rotate: animatedValue.interpolate({
              inputRange: [-1, 1],
              outputRange: ['-0.1rad', '0.1rad']
            })
          }]
        }}
      >
        {children}
      </Animated.View>
    );
  }
}

export default ShakingView;