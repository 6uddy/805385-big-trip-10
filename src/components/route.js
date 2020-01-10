import AbstractComponent from "./abstract-component";

const getTripRoutes = (events) => {
  if (events.length < 3) {
    return events[0].destination + ` - ` + events[1].destination + ` - ` + events[2].destination;
  }
  return events[0].destination + ` - ... - ` + events[events.length - 1].destination;
};

const createRouteTemplate = (events) => {

  return (
    `<div class="trip-info__main">
        <h1 class="trip-info__title">${getTripRoutes(events)}</h1>
        <p class="trip-info__dates">${(new Date(events[0].startTime)).toDateString().substr(4, 6)}&nbsp;&mdash;&nbsp;${(new Date(events[events.length - 1].endTime)).toDateString().substr(4, 6)}</p>
    </div>`
  );
};

export default class Route extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createRouteTemplate(this._events);
  }
}
