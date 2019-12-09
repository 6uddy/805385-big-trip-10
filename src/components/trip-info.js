import {createElement} from "./../util.js";

export default class TripInfo {
  constructor(cities, eventsData) {
    this._startCity = cities[0];
    this._middleCity = cities.length > 3 ? `...` : cities[1];
    this._endCity = cities[cities.length - 1];
    this._dateStartTrip = new Date(eventsData[0].start).toDateString().slice(4, 10);
    this._dateEndTrip = new Date(eventsData[eventsData.length - 1].end).toDateString().slice(4, 10);
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }

  getTemplate() {
    return `<div class="trip-info__main">
    <h1 class="trip-info__title">${this._startCity} &mdash; ${this._middleCity} &mdash; ${this._endCity}</h1>
    <p class="trip-info__dates">${this._dateStartTrip}&nbsp;&mdash;&nbsp;${this._dateEndTrip}</p>

    </div>`;
  }
}
