import {FilterType} from "../utils/filter";
import {getEventsByFilter} from "../utils/filter";
import {tripDates} from "../mock/event";

export default class Points {
  constructor() {
    this._events = [];
    this._tripDates = Array.from(tripDates);
    this._activeFilterType = FilterType.EVERYTHING;

    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];
  }

  getPoints() {
    return getEventsByFilter(this._events, this._activeFilterType);
  }

  getPointsAll() {
    return this._events;
  }

  setPoints(events) {
    this._events = Array.from(events);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  addPoint(event) {
    this._events = [].concat(event, this._events);
    this._callHandlers(this._dataChangeHandlers);
  }

  updatePoint(id, event) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index), event, this._events.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  removePoint(id) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index), this._events.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }
}
