import {isFutureDate, isPastDate} from "./common";

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

const getFutureEvents = (events, date) => {
  return events.filter((event) => {
    const startTime = event.startTime;

    return isFutureDate(startTime, date);
  });
};

const getPastEvents = (events, date) => {
  return events.filter((event) => {
    const startTime = event.startTime;

    return isPastDate(startTime, date);
  });
};

const getEventsByFilter = (events, filterType) => {
  const nowDate = new Date();

  switch (filterType) {
    case FilterType.EVERYTHING:
      return events;
    case FilterType.FUTURE:
      return getFutureEvents(events, nowDate);
    case FilterType.PAST:
      return getPastEvents(events, nowDate);
  }

  return events;
};

export {getEventsByFilter};
