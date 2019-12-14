const EVENT_COUNT = 20;

import Menu from './components/menu.js';
import Filters from './components/filters.js';
import TripInfo from './components/trip-info.js';
import Sort from './components/sort.js';
import DaysList from './components/days-list.js';
import TripController from './controller/trip-controller.js'
import AddEvent from './components/add-event.js';
import {RenderPosition, render} from "./utils/render.js";

import {
  getEventsData,
  menuValues,
  filtersNames,
  getPrice,
  getEventsInDays,
  getCities,
} from "./data.js";

const eventsData = getEventsData(EVENT_COUNT);
const tripCities = getCities(eventsData);
const eventsInDays = getEventsInDays(eventsData);

const tripControls = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);
const tripInfo = document.querySelector(`.trip-main__trip-info`);

const tripInfoCost = document.querySelector(`.trip-info__cost`).querySelector(`span`);
tripInfoCost.innerHTML = getPrice(eventsData);

render(tripControls.querySelector(`h2`), new Menu(menuValues));
render(tripControls, new Filters(filtersNames));
render(tripEvents.querySelector(`h2`), new Sort(), RenderPosition.AFTEREND);


if (eventsData.length > 0) {
  render(tripInfo, new TripInfo(tripCities, eventsData), RenderPosition.AFTERBEGIN);
  const daysList = new DaysList();
  render(tripEvents, daysList);
  const tripController = new TripController(daysList);
  tripController.render(eventsInDays);
} else {
  render(tripEvents, new AddEvent());
}

