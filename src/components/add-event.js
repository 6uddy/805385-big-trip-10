import {TYPES_OF_TRANSFER} from "../data.js";
import {TYPES_OF_ACTIVITY} from "../data.js";
import {CITIES} from "../data.js";

export const getNewEventTemplate = () => `<form class="trip-events__item  event  event--edit" action="#" method="post">
<header class="event__header">
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group">
      <fieldset class="event__type-group">
      <legend class="visually-hidden">Transfer</legend>
      ${TYPES_OF_TRANSFER.map((eventType) => `<div class="event__type-item">
      <input id="event-type-${eventType.split(` `)[0].toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType.split(` `)[0].toLowerCase()}">
      <label class="event__type-label  event__type-label--${eventType.split(` `)[0].toLowerCase()}" for="event-type-${eventType.split(` `)[0].toLowerCase()}-1">${eventType.split(` `)[0]}</label>
    </div>`).join(``)}
    </fieldset>
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Activity</legend>
      ${TYPES_OF_ACTIVITY.map((eventType) => `<div class="event__type-item">
      <input id="event-type-${eventType.split(` `)[0].toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType.split(` `)[0].toLowerCase()}">
      <label class="event__type-label  event__type-label--${eventType.split(` `)[0].toLowerCase()}" for="event-type-${eventType.split(` `)[0].toLowerCase()}-1">${eventType.split(` `)[0]}</label>
    </div>`).join(``)}
    </fieldset>
    </div>
  </div>

  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">

    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
    <datalist id="destination-list-1">
    ${CITIES.map((CITY) => `<option value="${CITY}"></option>`)}
    </datalist>
  </div>

  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">
      From
    </label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">
      To
    </label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="">
  </div>

  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
  </div>

  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
  <button class="event__reset-btn" type="reset">Cancel</button>
</header>
</form>`;
