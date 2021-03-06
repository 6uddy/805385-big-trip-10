import {getTripDates} from "../utils/common";

const EVENT_COUNT = 10;

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const getRandomDate = () => {
  const targetDate = new Date();
  const diffValue = getRandomIntegerNumber(0, 7);


  targetDate.setDate(targetDate.getDate() + diffValue);

  return Date.parse(targetDate);
};

const MAX_OPTIONS = 3;

const generateOptions = (options) => {
  return options
    .filter(() => Math.random() > 0.5)
    .slice(0, getRandomIntegerNumber(0, MAX_OPTIONS));
};

const DESCRIPTION_LENGTH = 3;

const generateDescription = (desc) => {
  return desc
    .filter(() => Math.random() > 0.5)
    .slice(0, getRandomIntegerNumber(1, DESCRIPTION_LENGTH));
};

const tripType = [
  `bus`,
  `check-in`,
  `drive`,
  `flight`,
  `restaurant`,
  `ship`,
  `sightseeing`,
  `taxi`,
  `train`,
  `transport`,
  `trip`
];

const destinationWaypoint = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
  `Saint Petersburg`
];

const tripDescription = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const additionalOptions = [
  {type: `luggage`, name: `Add luggage`, price: 10, isChecked: false},
  {type: `comfort`, name: `Switch to comfort class`, price: 150, isChecked: false},
  {type: `meal`, name: `Add meal`, price: 2, isChecked: false},
  {type: `seats`, name: `Choose seats`, price: 9, isChecked: false},
  {type: `train`, name: `Travel by train`, price: 40, isChecked: false}
];

const generateEvent = () => {
  const startTime = getRandomDate();
  const endTime = startTime + getRandomIntegerNumber(10000000, 10000000);
  return {
    id: String(getRandomIntegerNumber(1, 1000)),
    type: getRandomArrayItem(tripType),
    destination: getRandomArrayItem(destinationWaypoint),
    startTime,
    endTime,
    offers: generateOptions(additionalOptions),
    description: generateDescription(tripDescription),
    price: getRandomIntegerNumber(100, 1000),
    isFavorite: Math.random() > 0.5
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

let events = generateEvents(EVENT_COUNT);

events.sort((a, b) => a.startTime > b.startTime ? 1 : -1);

const tripDates = getTripDates(events);

export {events, tripDates, generateOptions, additionalOptions, generateDescription, tripDescription};

