export const splitString = (input: string) => {
  const regex = /[, #]+/;
  const result = input.split(regex);
  return result;
};
