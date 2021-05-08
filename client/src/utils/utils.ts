// https://stackoverflow.com/questions/2283566/how-can-i-round-a-number-in-javascript-tofixed-returns-a-string
export const toFixedNumber = (num, digits = 2, base = 10) => {
  const pow = Math.pow(base, digits);
  return Math.round(num * pow) / pow;
};
