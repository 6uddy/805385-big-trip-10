import {
  getRandomElement,
  getRandomArray,
  getPhotos,
  getRandomInteger,
  getRandomDate
} from "./utils/common.js";

const DAYS_COUNT = 5;

export const CITIES = [`London`, `Liverpool`, `Birmingham`, `Oxford`, `Cambridge`, `Manchester`, `Nottingham`, `Sheffield`, `Leeds`, `Bristol`, `Newcastle`];

export const TYPES_OF_TRANSFER = [
  `Bus to`,
  `Drive to`,
  `Flight to`,
  `Ship to`,
  `Taxi to`,
  `Train to`,
  `Transport to`,
];
export const TYPES_OF_ACTIVITY = [
  `Check-in in`,
  `Restaurant in`,
  `Sightseeing in`,
];

const TYPES_OF_EVENT = TYPES_OF_TRANSFER.concat(TYPES_OF_ACTIVITY);

const DESCRIPTIONS = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];

export const OPTIONS = [{
  id: `luggage`,
  option: `Add luggage`,
  price: 10
},
  {
    id: `comfort`,
    option: `Switch to comfort class`,
    price: 150
  },
  {
    id: `meal`,
    option: `Add meal`,
    price: 2
  },
  {
    id: `seats`,
    option: `Choose seats`,
    price: 9
  },
];

const getEvent = () => {
  const type = getRandomElement(TYPES_OF_EVENT);
  const start = getRandomDate(DAYS_COUNT);
  const residual = getRandomInteger(20, 180) * 60 * 1000;
  const end = start + residual;
  const residualInHours = residual / 1000 / 60 / 60;
  const hours = Math.trunc(residualInHours);
  const minutes = Math.trunc((residualInHours - hours) * 60);
  return {
    date: `${new Date(start)}`.slice(4, 10),
    type,
    city: getRandomElement(CITIES),
    price: getRandomInteger(0, 1000),
    description: Array.from(new Set(getRandomArray(1, 3, DESCRIPTIONS))).join(``),
    start,
    end,
    hours,
    minutes,
    offers: new Set(getRandomArray(1, 4, OPTIONS)),
    urls: Array.from(new Set(getPhotos(0, 5))),
  };
};

export const getEventsData = (count) => {
  const events = new Array(count);
  return events.fill(``).map(getEvent).sort((a, b) => a.start - b.start);
};

export const menuValues = [
  {
    title: `Table`,
    active: true
  },
  {
    title: `Stats`,
    active: false
  },
];

export const filtersNames = [`Everything`, `Future`, `Past`];

export const getCities = (eventsData) => {
  return eventsData.map((event) => event.city);
};

export const getEventsInDays = (eventsData) => {
  return eventsData.reduce((acc, event) => {
    const date = new Date(event.start).toDateString();
    if (acc[date]) {
      acc[date].push(event);
    } else {
      acc[date] = [event];
    }
    return acc;
  }, {});
};

export const getPrice = (eventsData) => {
  const tripPrices = eventsData.map((event) => event.price).reduce((a, b) => a + b);
  const offersPrices = eventsData.map((event) => Array.from(event.offers).reduce((a, b) => {
    return a + b.price;
  }, 0)).reduce((a, b) => a + b);
  return tripPrices + offersPrices;
};
