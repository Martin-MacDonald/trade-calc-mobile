import { Alert } from 'react-native';

const alert = ({ title, message }) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Ok',
        style: 'cancel',
      },
    ],
  );
};

export default alert;