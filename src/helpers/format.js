export const checkUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9]{6,12}$/;
  return username.match(usernameRegex);
};

export const checkEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(emailRegex);
};

export const checkPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  return password.match(passwordRegex);
};