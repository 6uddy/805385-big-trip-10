import AbstractComponent from "./abstract-component.js";

export default class TripInfo extends AbstractComponent {
  constructor(cities, eventsData) {
    super();
    this._startCity = cities[0];
    this._middleCity = cities.length > 3 ? `...` : cities[1];
    this._endCity = cities[cities.length - 1];
    this._dateStartTrip = new Date(eventsData[0].start).toDateString().slice(4, 10);
    this._dateEndTrip = new Date(eventsData[eventsData.length - 1].end).toDateString().slice(4, 10);
  }

  getTemplate() {
    return `<div class="trip-info__main">
    <h1 class="trip-info__title">${this._startCity} &mdash; ${this._middleCity} &mdash; ${this._endCity}</h1>
    <p class="trip-info__dates">${this._dateStartTrip}&nbsp;&mdash;&nbsp;${this._dateEndTrip}</p>

    </div>`;
  }
}
