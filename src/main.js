import {getMenuTemplate} from './components/menu.js';
import {getFiltersTemplate} from './components/filters.js';
import {getTripInfoTemplate} from './components/trip-info.js';
import {getSortTemplate} from './components/sort.js';
import {getFormTemplate} from './components/form.js';
import {getDaysListTemplate} from './components/days-list.js';
import {getCardTemplate} from './components/card.js';

const DAYS = 3;

const tripControls = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

const renderComponent = function (element, component, where) {
  element.insertAdjacentHTML(where, component);
};

renderComponent(tripControls.querySelector(`h2`), getMenuTemplate(), `afterend`);
renderComponent(tripControls, getFiltersTemplate(), `beforeend`);
renderComponent(document.querySelector(`.trip-info`), getTripInfoTemplate(), `afterbegin`);
renderComponent(tripEvents, getSortTemplate(), `beforeend`);
renderComponent(tripEvents, getFormTemplate(), `beforeend`);
renderComponent(tripEvents, getDaysListTemplate(), `beforeend`);

const daysList = tripEvents.querySelector(`.trip-days`);
for (let i = 0; i < DAYS; i++) {
  renderComponent(daysList, getCardTemplate(), `beforeend`);
}
