const TIME_IN_MS = 60 * 60 * 24 * 1000;

export const getRandomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const getRandomDate = (days) => {
  return Date.now() + (getRandomInteger(0, (days * 24))) * TIME_IN_MS / 24;
};

export const formatDate = (date) => {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear() % 100;
  return `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${year < 10 ? `0${year}` : year}`;
};

export const getRandomElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

export const getPhotos = (min, max) => {
  const newArray = [];
  const newArrayLength = getRandomInteger(min, max);
  for (let i = 0; i < newArrayLength; i++) {
    newArray.push(`http://picsum.photos/300/150?r=${Math.random()}`);
  }
  return newArray;
};

export const getRandomArray = (min, max, array) => {
  const newArray = [];
  const newArrayLength = getRandomInteger(min, max);
  for (let i = 0; i < newArrayLength; i++) {
    newArray.push(getRandomElement(array));
  }
  return newArray;
};

