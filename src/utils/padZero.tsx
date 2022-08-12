export const padToFour = (num: number = 0) => {
  return num <= 9999 ? `000${num}`.slice(-4) : num.toString();
};
