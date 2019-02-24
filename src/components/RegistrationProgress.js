import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import applyScale from '../helpers/applyScale';
import commonStyles from '../config/commonStyles';

const { width } = Dimensions.get('window');
const stdStyles = {
  activeSize: applyScale(45),
  inactiveSize: applyScale(25),
  progressLineHeight: applyScale(3),
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
    backgroundColor: commonStyles.highlightColor,
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
    backgroundColor: commonStyles.highlightColor,
  };
  return (
    <View
      style={[styles.progressCircle, style]}
    >
      {
        completed &&
        <Ionicons
          name='md-checkmark'
          color={commonStyles.primaryColor}
          size={commonStyles.iconSize}
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