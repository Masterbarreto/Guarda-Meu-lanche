export const generateCode = (numbers = 4, chars = 1) => {
  const digits = Array.from({ length: numbers }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const randomLetters = Array.from(
    { length: chars },
    () => letters[Math.floor(Math.random() * letters.length)]
  ).join("");

  return `${digits}${randomLetters}`;
};
