const EVENT_COUNT = 16;
import {getMenuTemplate} from './components/menu.js';
import {getFiltersTemplate} from './components/filters.js';
import {getTripInfoTemplate} from './components/trip-info.js';
import {getSortTemplate} from './components/sort.js';

import {getNewEventTemplate} from './components/add-event.js';
import {getDaysListTemplate} from './components/days-list.js';

import {
  getEventsData,
  menuValues,
  TYPES_OF_TRANSFER,
  TYPES_OF_ACTIVITY,
  CITIES,
  OPTIONS,
  filtersNames
} from "./data.js";

const renderComponent = function (element, component, where) {
  element.insertAdjacentHTML(where, component);
};
const tripControls = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);
const eventsData = getEventsData(EVENT_COUNT);

const getCities = () => {
  return eventsData.map((event) => event.city);
};

const getDatesStart = () => {
  return eventsData.map((event) => new Date(event.start));
};

const getDatesEnd = () => {
  return eventsData.map((event) => new Date(event.end));
};

const tripDaysDates = new Set(getDatesStart().map((date) => `${date}`.slice(4, 10)));

const getPrice = () => {
  const tripPrices = eventsData.map((event) => event.price).reduce((a, b) => a + b);
  const offersPrices = eventsData.map((event) => Array.from(event.offers).reduce((a, b) => {
    return a + b.price;
  }, 0)).reduce((a, b) => a + b);
  return tripPrices + offersPrices;
};

renderComponent(tripControls.querySelector(`h2`), getMenuTemplate(menuValues), `afterend`);
renderComponent(document.querySelector(`.trip-info`), getTripInfoTemplate(getCities(), getDatesStart(), getDatesEnd()), `afterbegin`);
renderComponent(tripControls, getFiltersTemplate(filtersNames), `beforeend`);
renderComponent(tripEvents, getSortTemplate(), `beforeend`);
renderComponent(tripEvents, getNewEventTemplate(), `beforeend`);
renderComponent(tripEvents, getDaysListTemplate(eventsData, tripDaysDates, TYPES_OF_TRANSFER, TYPES_OF_ACTIVITY, CITIES, OPTIONS), `beforeend`);
renderComponent(document.querySelector(`.trip-info__cost`), getPrice(), `beforeend`);
