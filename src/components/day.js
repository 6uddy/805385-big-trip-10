import {getEditEventTemplate} from "./edit-event";
import {getEventTemplate} from "./event";

export const getDayTemplate = (dayIndex, date, events, transfer, activity, cities, options) => `<li class="trip-days__item  day day--${dayIndex + 1}">
<div class="day__info">
  <span class="day__counter">${dayIndex + 1}</span>
  <time class="day__date" datetime="${new Date(date).toString().slice(4, 11)}">${new Date(date).toString().slice(4, 11)}</time>
</div>

<ul class="trip-events__list">
${events.map((event, index) => {
  if (dayIndex === 0 && index === 0) {
    return getEditEventTemplate(event, transfer, activity, cities, options);
  }
  return getEventTemplate(event);
}).join(`
`)}
</ul>
</li>`;
