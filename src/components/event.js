export const getEventTemplate = ({type, city, price, start, end, hours, minutes, offers}) => `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.split(` `)[0].toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${city}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${new Date(start).toString().slice(4, 21)}">${new Date(start).toTimeString().slice(0, 5)}</time>
          &mdash;
          <time class="event__end-time" datetime="${new Date(end).toString().slice(4, 21)}">${new Date(end).toTimeString().slice(0, 5)}</time>
        </p>
        <p class="event__duration">${hours}H ${minutes}M</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${Array.from(offers).map((offer) => `<li class="event__offer">
      <span class="event__offer-title">${offer.option}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
     </li>`).join(``)}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
