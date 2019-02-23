import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const commonStyles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 0.05 * width,
    paddingRight: 0.05 * width,
  },
};

export default commonStyles;