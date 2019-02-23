import { createSwitchNavigator } from 'react-navigation';
import Register from '../views/registration/Register';

const SwitchNavigator = createSwitchNavigator(
  {
    Register,
  },
  {
    initialRouteName: 'Register',
  }
);

export default SwitchNavigator;