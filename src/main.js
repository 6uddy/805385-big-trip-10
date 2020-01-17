import {events} from "./mock/event";
import {MenuItem} from "./components/menu";
import {render, RenderPosition} from "./utils/render";

import Menu from "./components/menu"
import Route from "./components/route"
import TripEvents from "./components/trip-events"
import Statistics from "./components/statistics"
import TripController from "./controller/trip-controller";
import FilterController from "./controller/filter-controller";
import PointModel from "./models/points";

const menuComponent = new Menu();

const pointModel = new PointModel();
const tripEvents = new TripEvents();
pointModel.setPoints(events);
const statisticsComponent = new Statistics(pointModel);
const mainElement = document.querySelector(`.page-main`);
const mainElementContainer = mainElement.querySelector(`.page-body__container`);
const headerControls = document.querySelector(`.trip-controls`);

render(headerControls, menuComponent, RenderPosition.BEFOREEND);

const eventAddBtn = document.querySelector(`.trip-main__event-add-btn`);
eventAddBtn.addEventListener(`click`, () => {
  trip.createEvent();
});

render(mainElementContainer, tripEvents, RenderPosition.BEFOREEND);
render(mainElementContainer, statisticsComponent, RenderPosition.BEFOREEND);

const filterController = new FilterController(headerControls, pointModel);
filterController.render();

const trip = new TripController(tripEvents, pointModel);

statisticsComponent.hide();
trip.render();

const tripRoute = document.querySelector(`.trip-info`);

render(tripRoute, new Route(events), RenderPosition.AFTERBEGIN);

const tripCost = document.querySelector(`.trip-info__cost-value`);

tripCost.textContent = events.reduce((sum, it) => {
  return sum + parseFloat(it.price);
}, 0);

menuComponent.setOnClick((menuItem) => {
  switch (menuItem) {
    case MenuItem.STATS:
      trip.hide();
      statisticsComponent.show();
      break;
    case MenuItem.TABLE:
      statisticsComponent.hide();
      trip.show();
      break;
  }
});



