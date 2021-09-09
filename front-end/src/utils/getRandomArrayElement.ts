const getRandomArrayElement = <T extends unknown>(arr: T[]) => {
  if (arr.length === 0) {
    return null;
  }
  // Random index
  return arr[Math.round(Math.random() * (arr.length - 1))];
};

export default getRandomArrayElement;