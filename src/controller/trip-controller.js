import {render, RenderPosition} from "../utils/render";
import TripList from "../components/trip-list";
import TripDays from "../components/trip-days";
import NoEvents from "../components/no-events";
import Sort, {SortType} from "../components/sort";
import {getTripDates} from "../utils/common";
import PointController, {EmptyEvent, Mode as PointControllerMode} from "./point-controller";


const renderEvents = (container, events, onDataChange, onViewChange, mode, isSortedByDefault) => {
  let controllers = [];

  const tripDates = isSortedByDefault ? [...getTripDates(events)] : [true];

  tripDates.forEach((it, index) => {
    const day = isSortedByDefault ? new TripDays(it, index + 1) : new TripDays();

    events
      .filter((event) => {
        return isSortedByDefault ? new Date(event.startTime).toDateString() === it : event;
      })
      .forEach((event) => {
        const pointController = new PointController(day.getElement().querySelector(`.trip-events__list`), onDataChange, onViewChange);
        pointController.render(event, mode);

        controllers.push(pointController);
      });
    render(container.getElement(), day, RenderPosition.BEFOREEND);
  });

  return controllers;
};

export default class TripController {
  constructor(container, pointModel) {
    this._container = container;
    this._pointModel = pointModel;

    this._showedEventControllers = [];
    this._creatingEvent = null;
    this._isSortedByDefault = true;

    this._noEvents = new NoEvents();
    this._sort = new Sort();
    this._tripList = new TripList();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onPointDataChange = this._onPointDataChange.bind(this);

    this._pointModel.setFilterChangeHandler(this._onFilterChange);
    this._pointModel.setDataChangeHandler(this._onPointDataChange);
  }

  render() {
    const container = this._container.getElement();
    const events = this._pointModel.getPoints();

    if (!events.length) {
      render(container, this._noEvents, RenderPosition.BEFOREEND);
    }
    render(container, this._sort, RenderPosition.BEFOREEND);
    render(container, this._tripList, RenderPosition.BEFOREEND);

    this._showedEventControllers = renderEvents(
      this._tripList,
      this._pointModel.getPoints(),
      this._onDataChange,
      this._onViewChange,
      PointControllerMode.DEFAULT,
      this._isSortedByDefault
    );

    this._sort.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  createEvent() {
    if (this._creatingEvent) {
      return;
    }

    this._creatingEvent = new PointController(this._container.getElement(), this._onDataChange, this._onViewChange);
    this._creatingEvent.render(EmptyEvent, PointControllerMode.ADDING);
  }

  show() {
    this._container.show();
  }

  hide() {
    this._container.hide();
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === EmptyEvent) {
      this._creatingEvent = null;
      if (newData === null) {
        pointController.destroy();
        this._updateEvents();
      } else {
        this._pointModel.addPoint(newData);

        this._showedEventControllers = [].concat(pointController, this._showedEventControllers);
        this._updateEvents();
      }
    } else if (newData === null) {
      this._pointModel.removePoint(oldData.id);
    } else {
      const isSuccess = this._pointModel.updatePoint(oldData.id, newData);
      if (isSuccess) {
        pointController.render(newData, PointControllerMode.DEFAULT);
      }
    }
  }

  _onViewChange() {
    this._showedEventControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    let sortedEvents = [];
    const events = this._pointModel.getPoints();

    switch (sortType) {
      case SortType.TIME:
        this._isSortedByDefault = false;
        sortedEvents = events.slice().sort((a, b) => (b.endTime - b.startTime) - (a.endTime - a.startTime));
        break;
      case SortType.PRICE:
        this._isSortedByDefault = false;
        sortedEvents = events.slice().sort((a, b) => b.price - a.price);
        break;
      case SortType.DEFAULT:
        this._isSortedByDefault = true;
        sortedEvents = events.slice();
        break;
    }

    this._removeEvents();
    this._showedEventControllers = renderEvents(
      this._tripList,
      sortedEvents,
      this._onDataChange,
      this._onViewChange,
      PointControllerMode.DEFAULT,
      this._isSortedByDefault
    );
  }

  _removeEvents() {
    this._tripList.getElement().innerHTML = ``;
    this._showedEventControllers.forEach((it) => it.destroy());
    this._showedEventControllers = [];
  }

  _updateEvents() {
    this._removeEvents();
    this._showedEventControllers = renderEvents(
      this._tripList,
      this._pointModel.getPoints(),
      this._onDataChange,
      this._onViewChange,
      PointControllerMode.DEFAULT,
      this._isSortedByDefault
    );
  }

  _onFilterChange() {
    this._updateEvents();
  }

  _onPointDataChange() {
    this._updateEvents();
  }
}
