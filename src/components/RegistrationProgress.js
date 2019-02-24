import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import applyScale from '../helpers/applyScale';

const { width } = Dimensions.get('window');
const stdStyles = {
  activeSize: applyScale(40),
  inactiveSize: applyScale(30),
  progressLineHeight: applyScale(3),
  iconSize: applyScale(20),
  iconColor: '#fff',
};
const styles = StyleSheet.create({
  container: {
    width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  progressCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressLine: {
    width,
    height: stdStyles.progressLineHeight,
    backgroundColor: '#000',
    position: 'absolute',
    top: stdStyles.activeSize / 2 - stdStyles.progressLineHeight / 2,
    left: 0,
  }
});

const ProgressCircle = ({ completed, active }) => {
  const style = {
    height: active ? stdStyles.activeSize : stdStyles.inactiveSize,
    width: active ? stdStyles.activeSize : stdStyles.inactiveSize,
    borderRadius: active ? stdStyles.activeSize / 2 : stdStyles.inactiveSize / 2,
    backgroundColor: '#000',
  };
  return (
    <View
      style={[styles.progressCircle, style]}
    >
      {
        completed &&
        <Ionicons
          name='md-checkmark'
          color={stdStyles.iconColor}
          size={stdStyles.iconSize}
        />
      }
    </View>
  );
};

class RegistrationProgress extends Component {
  renderProgress = () => {
    const { number, progress } = this.props;
    const progressCircles = [];
    for (let i = 0; i < number; i++) {
      progressCircles.push(
        <ProgressCircle
          key={i}
          completed={progress > i}
          active={progress === i}
        />
      );
    }
    return progressCircles;
  };

  render() {
    const { style } = this.props;
    return (
      <View
        style={[styles.container, style]}
      >
        <View
          style={styles.progressLine}
        />
        {
          this.renderProgress()
        }
      </View>
    );
  }
}

export default RegistrationProgress;