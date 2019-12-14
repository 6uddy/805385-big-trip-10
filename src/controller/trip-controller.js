import Day from '../components/day.js';
import Event from '../components/event.js';
import EditEvent from '../components/edit-event.js';
import {render, replace} from "./../utils/render.js";

export default class TripController {
  constructor(container) {
    this._container = container;
  }

  render(eventsData) {
    const datesData = Object.keys(eventsData);
    datesData.forEach((date, index) => {
      const day = this._renderDay(date, index);
      const eventsInDayData = eventsData[date];
      const eventsList = day.getElement().querySelector(`.trip-events__list`);
      this._renderEventsList(eventsInDayData, eventsList);
    });
  }

  _renderDay(date, index) {
    const day = new Day(date, index);
    render(this._container.getElement(), day);
    return day;
  }

  _renderEventsList(eventsInDayData, eventsList) {
    eventsInDayData.map((eventData) => {
      this._renderEvent(eventData, eventsList);
    });
  }

  _renderEvent(eventData, container) {
    const event = new Event(eventData);
    const editEvent = new EditEvent(eventData);
    render(container, event);

    const onEscKeydown = (evt) => {
      if (evt.key === `Esc` || evt.key === `Escape`) {
        replace(event.getElement(), editEvent.getElement());
        document.removeEventListener(`keydown`, onEscKeydown);
      }
    };

    event.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      replace(editEvent, event);
      document.addEventListener(`keydown`, onEscKeydown);
    });
    editEvent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      replace(event, editEvent);
      document.removeEventListener(`keydown`, onEscKeydown);
    });

    editEvent.getElement().querySelector(`.event--edit`).addEventListener(`submit`, () => {
      replace(event, editEvent);
      document.removeEventListener(`keydown`, onEscKeydown);
    });
  }
}
