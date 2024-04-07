isPhoneNumber = (phoneNumber) => {
  return /^(\+|00)[1-9][0-9 -().]{7,32}$/.test(phoneNumber);
};

isEmail = (email) => {
  return /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};

isName = (name) => {
  return /^[a-zA-Z-]{2,50}$/.test(name);
};

isTitle = (title) => {
  return /^[a-zA-Z\s-]{2,50}$/.test(title);
};

isAddress = (address) => {
  return /^[a-zA-Z0-9\s,.'-]{2,50}$/.test(address);
};

isImage = (image) => {
  return /^data:image\/\w+([+.-]\w+)*;base64,/.test(image);
};

isPassword = (password) => {
  return /^(?=.*\d)[^\s]{8,20}$/.test(password);
};

module.exports = {
  isPhoneNumber,
  isEmail,
  isName,
  isTitle,
  isAddress,
  isImage,
  isPassword,
};
