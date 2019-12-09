const TIME_IN_MS = 60 * 60 * 24 * 1000;

export const getRandomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const getRandomDate = (days) => {
  return Date.now() + (getRandomInteger(0, (days * 24))) * TIME_IN_MS / 24;
};

export const formatDate = (date) => {
  let dd = date.getDate();
  if (dd < 10) {
    dd = `0` + dd;
  }
  let mm = date.getMonth() + 1;
  if (mm < 10) {
    mm = `0` + mm;
  }
  let yy = date.getFullYear() % 100;
  if (yy < 10) {
    yy = `0` + yy;
  }
  return dd + `.` + mm + `.` + yy;
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

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, element) => {
  container.append(element);
};

export const remove = (element) => {
  if (element) {
    element.remove();
  }
};
