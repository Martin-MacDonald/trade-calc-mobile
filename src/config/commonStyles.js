import { Dimensions } from 'react-native';
import applyScale from '../helpers/applyScale';

const { width, height } = Dimensions.get('window');

const commonStyles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 0.05 * width,
    paddingRight: 0.05 * width,
  },
  normalTextSize: applyScale(16),
  primaryColor: '#335C67',
  highlightColor: '#ffffff',
  standardPadding: applyScale(10),
  iconSize: applyScale(20),
};

export default commonStyles;