export const capitalizeAndDeleteDash = (string) => {
  let newString = string.charAt(0).toUpperCase() + string.slice(1);
  newString = newString.replace(/-/g, " ");
  return newString;
};
