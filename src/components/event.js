import {formatTime, getDuration} from "../utils/common";
import AbstractComponent from "./abstract-component";

const createOfferMarkup = (offers) => {
  return offers
    .map(({name, price}) => {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${name}</span>
          +
          &euro;<span class="event__offer-price">${price}</span>
         </li>`
      );
    })
    .join(`\n`);
};

const createEventTemplate = (event) => {

  const offerList = createOfferMarkup(event.offers);

  const startTime = new Date(event.startTime);
  const endTime = new Date(event.endTime);

  return (
    `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${event.type} to ${event.destination}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${event.startTime}">${formatTime(startTime)}</time>
              &mdash;
              <time class="event__end-time" datetime="${event.endTime}">${formatTime(endTime)}</time>
            </p>
            <p class="event__duration">${getDuration(startTime, endTime)}</p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${event.price}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${offerList}
          </ul>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
    </li>`
  );
};

export default class Event extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createEventTemplate(this._events);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
