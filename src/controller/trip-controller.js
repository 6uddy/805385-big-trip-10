import {render, RenderPosition} from "../utils/render";
import TripList from "../components/trip-list";
import TripDays from "../components/trip-days";
import NoEvents from "../components/no-events";
import Sort, {SortType} from "../components/sort";
import {tripDates} from "../mock/event";
import PointController from "./point-controller";

const filterEventByEventDate = (events, tripDate) => {
  return events.filter((event) => new Date(event.startTime).toDateString() === tripDate);
};

const renderEvents = (tripEventList, events, onDataChange, onViewChange) => {
  return events.map((event) => {
    const pointController = new PointController(tripEventList, onDataChange, onViewChange);
    pointController.render(event);

    return pointController;
  });
};

const renderEventsByDays = (container, events, onDataChange, onViewChange) => {
  let controllers = [];
  Array.from(tripDates).forEach((it, index) => {
    const trip = new TripDays(it, index + 1);
    render(container.getElement(), trip, RenderPosition.BEFOREEND);
    const tripEventsList = trip.getElement().querySelector(`.trip-events__list`);
    filterEventByEventDate(events, it).forEach((event) => {
      const pointController = new PointController(tripEventsList, onDataChange, onViewChange);
      pointController.render(event);

      controllers.push(pointController);
      return controllers;
    });
  });
  return controllers;
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._events = [];
    this._pointControllers = [];
    this._noEvents = new NoEvents();
    this._sort = new Sort();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(events) {
    this._events = events;
    const tripList = new TripList();

    if (!events.length) {
      render(this._container, this._noEvents, RenderPosition.BEFOREEND);
    }
    render(this._container, this._sort, RenderPosition.BEFOREEND);
    render(this._container, tripList, RenderPosition.BEFOREEND);

    const allEvents = renderEventsByDays(tripList, events, this._onDataChange, this._onViewChange);

    this._pointControllers = this._pointControllers.concat(allEvents);

    this._sort.setSortTypeChangeHandler((sortType) => {
      let sortedEvents = [];

      switch (sortType) {
        case SortType.TIME:
          sortedEvents = events.slice().sort((a, b) => (b.endTime - b.startTime) - (a.endTime - a.startTime));
          break;
        case SortType.PRICE:
          sortedEvents = events.slice().sort((a, b) => b.price - a.price);
          break;
        case SortType.DEFAULT:
          sortedEvents = events.slice();
          break;
      }

      tripList.getElement().innerHTML = ``;

      if (sortType === SortType.DEFAULT) {
        renderEventsByDays(tripList, sortedEvents, this._onDataChange, this._onViewChange);
      }
      const trip = new TripDays();
      render(tripList.getElement(), trip, RenderPosition.BEFOREEND);
      const tripEventsList = trip.getElement().querySelector(`.trip-events__list`);
      renderEvents(tripEventsList, sortedEvents, this._onDataChange, this._onViewChange);
    });
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    pointController.render(this._events[index]);
  }

  _onViewChange() {
    this._pointControllers.forEach((it) => it.setDefaultView());
  }
}
