import {events} from "./mock/event";
import {menu} from "./mock/menu";
import {render, RenderPosition} from "./utils/render";

import Menu from "./components/menu"
import Route from "./components/route"
import TripController from "./controller/trip-controller";
import FilterController from "./controller/filter-controller";
import PointModel from "./models/points";

const pointModel = new PointModel();
pointModel.setPoints(events);

const headerControls = document.querySelector(`.trip-controls`);

render(headerControls, new Menu(menu), RenderPosition.BEFOREEND);

const eventAddBtn = document.querySelector(`.trip-main__event-add-btn`);
eventAddBtn.addEventListener(`click`, () => {
  trip.createEvent();
});

const filterController = new FilterController(headerControls, pointModel);
filterController.render();

const tripBoard = document.querySelector(`.trip-events`);

const trip = new TripController(tripBoard, pointModel);

trip.render();

const tripRoute = document.querySelector(`.trip-info`);

render(tripRoute, new Route(events), RenderPosition.AFTERBEGIN);

const tripCost = document.querySelector(`.trip-info__cost-value`);

tripCost.textContent = events.reduce((sum, it) => {
  return sum + parseFloat(it.price);
}, 0);


