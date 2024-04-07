export const isPhoneNumber = (phoneNumber: string) => {
  return /^(\+|00)[1-9][0-9 -().]{7,32}$/.test(phoneNumber);
};

export const isEmail = (email: string) => {
  return /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};

export const isName = (name: string) => {
  return /^[a-zA-Z-]{2,50}$/.test(name);
};

export const isTitle = (title: string) => {
  return /^[a-zA-Z\s-]{2,50}$/.test(title);
};

export const isAddress = (address: string) => {
  return /^[a-zA-Z0-9\s,.'-]{2,50}$/.test(address);
};

export const isImage = (image: string) => {
  return /^data:image\/\w+([+.-]\w+)*;base64,/.test(image);
};

export const isPassword = (password: string) => {
  return /^(?=.*\d)[^\s]{8,20}$/.test(password);
};
