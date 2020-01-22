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
import {API} from "./api";

const AUTHORIZATION = `Basic password`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip`;

const api = new API(END_POINT, AUTHORIZATION);

const menuComponent = new Menu();

const pointModel = new PointModel();
const tripEvents = new TripEvents();

const statisticsComponent = new Statistics(pointModel);
const mainElement = document.querySelector(`.page-main`);
const mainElementContainer = mainElement.querySelector(`.page-body__container`);
const headerControls = document.querySelector(`.trip-controls`);
const filterController = new FilterController(headerControls, pointModel);
const trip = new TripController(tripEvents, pointModel, api);
const tripRoute = document.querySelector(`.trip-info`);
const tripCost = document.querySelector(`.trip-info__cost-value`);

const eventAddBtn = document.querySelector(`.trip-main__event-add-btn`);
eventAddBtn.addEventListener(`click`, () => {
  trip.createEvent();
});

render(headerControls, menuComponent, RenderPosition.BEFOREEND);
render(mainElementContainer, tripEvents, RenderPosition.BEFOREEND);
render(mainElementContainer, statisticsComponent, RenderPosition.BEFOREEND);

filterController.render();

statisticsComponent.hide();

render(tripRoute, new Route(events), RenderPosition.AFTERBEGIN);

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

api.getData()
  .then((points) => {
    pointModel.setPoints(points);
    trip.render();
  });


