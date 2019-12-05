import {getDayTemplate} from "./day.js";

export const getDaysListTemplate = (events, dates, transfer, activity, cities, options) => {
  return `<ul class="trip-days">
  ${Array.from(dates).map((date, index) => {
    const dayEvents = events.filter((event) => {
      const eventDate = `${new Date(event.start)}`.slice(4, 10);
      return eventDate === date;
    });
    return getDayTemplate(index, date, dayEvents, transfer, activity, cities, options);
  }).join(``)
  }
</ul>`;
};
