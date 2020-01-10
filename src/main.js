import {events} from "./mock/event";
import {menu} from "./mock/menu";
import {filters} from "./mock/filter";
import {render, RenderPosition} from "./utils/render";

import Menu from "./components/menu"
import Filters from "./components/filters"
import Route from "./components/route"
import TripController from "./controller/trip-controller";

const headerControls = document.querySelector(`.trip-controls`);

render(headerControls, new Menu(menu), RenderPosition.BEFOREEND);
render(headerControls, new Filters(filters), RenderPosition.BEFOREEND);

const tripBoard = document.querySelector(`.trip-events`);

const trip = new TripController(tripBoard);

trip.render(events);

const tripRoute = document.querySelector(`.trip-info`);

render(tripRoute, new Route(events), RenderPosition.AFTERBEGIN);

const tripCost = document.querySelector(`.trip-info__cost-value`);

tripCost.textContent = events.reduce((sum, it) => {
  return sum + parseFloat(it.price);
}, 0);


