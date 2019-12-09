const EVENT_COUNT = 16;

import Menu from './components/menu.js';
import Filters from './components/filters.js';
import TripInfo from './components/trip-info.js';
import Sort from './components/sort.js';

import DaysList from './components/days-list.js';
import Day from './components/day.js';
import EventsList from './components/events-list.js';
import Event from './components/event.js';
import EditEvent from './components/edit-event.js';
import AddEvent from './components/add-event.js';

import {
  getEventsData,
  menuValues,
  TYPES_OF_TRANSFER,
  TYPES_OF_ACTIVITY,
  CITIES,
  OPTIONS,
  filtersNames,
  getUniqDates,
  getCities,
} from "./data.js";

const tripControls = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);
const tripInfo = document.querySelector(`.trip-main__trip-info`);
const addButton = document.querySelector(`.trip-main__event-add-btn`);
const eventsData = getEventsData(EVENT_COUNT);
const uniqDates = getUniqDates(eventsData);
const tripCities = getCities(eventsData);

const renderMenu = () => {
  const menu = new Menu(menuValues);
  tripControls.querySelector(`h2`).after(menu.getElement());
};

const renderFilters = () => {
  const filters = new Filters(filtersNames);
  tripControls.append(filters.getElement());
};

const renderTripInfo = () => {
  const info = new TripInfo(tripCities, eventsData);
  tripInfo.prepend(info.getElement());
};

const renderSort = () => {
  const sort = new Sort();
  tripEvents.querySelector(`h2`).after(sort.getElement());
};
const renderEventAdd = () => {
  const eventAdd = new AddEvent(TYPES_OF_TRANSFER, TYPES_OF_ACTIVITY, CITIES);
  tripEvents.append(eventAdd.getElement());
  addButton.disabled = true;
};

const renderDaysList = () => {
  const daysList = new DaysList();
  tripEvents.append(daysList.getElement());

  uniqDates.map((date, index) => {
    return renderDay(date, index, daysList.getElement());
  });
};

const renderDay = (date, index, container) => {
  const eventsInDayData = getDayEvents(date);

  const day = new Day(eventsInDayData[0].start, index);
  container.append(day.getElement());

  const eventsList = renderEventsList(day.getElement());
  eventsInDayData.map((eventData) => {
    renderEvent(eventData, eventsList.getElement());
  });
};

const renderEventsList = (container) => {
  const eventsList = new EventsList();
  container.append(eventsList.getElement());
  return eventsList;
};

const getDayEvents = (date) => {
  const dayEvents = eventsData.filter((event) => {
    return event.date === date;
  });
  return dayEvents;
};

const renderEvent = (eventData, container) => {
  const event = new Event(eventData);
  const eventEdit = new EditEvent(eventData, TYPES_OF_TRANSFER, TYPES_OF_ACTIVITY, CITIES, OPTIONS);
  container.append(event.getElement());

  const onEscKeydown = (evt) => {
    if (evt.key === `Esc` || evt.key === `Escape`) {
      container.replaceChild(event.getElement(), eventEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeydown);
    }
  };

  event.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    container.replaceChild(eventEdit.getElement(), event.getElement());
    document.addEventListener(`keydown`, onEscKeydown);
  });
  eventEdit.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    container.replaceChild(event.getElement(), eventEdit.getElement());
    document.removeEventListener(`keydown`, onEscKeydown);
  });

  eventEdit.getElement().querySelector(`.event--edit`).addEventListener(`submit`, () => {
    container.replaceChild(event.getElement(), eventEdit.getElement());
    document.removeEventListener(`keydown`, onEscKeydown);
  });
};

renderMenu();
renderFilters();
renderSort();

if (eventsData.length > 0) {
  renderTripInfo();
  renderDaysList();
} else {
  renderEventAdd();
}
