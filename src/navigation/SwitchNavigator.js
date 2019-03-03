import { createSwitchNavigator } from 'react-navigation';
import Register from '../views/registration/Register';
import ConfirmEmail from '../views/ConfirmEmail';

const SwitchNavigator = createSwitchNavigator(
  {
    Register,
    ConfirmEmail,
  },
  {
    initialRouteName: 'Register',
  }
);

export default SwitchNavigator;