import moment from "moment";

const HOUR_PER_MS = 3600000;
const DAY_PER_MS = 86400000;

export const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

export const getTripDates = (cards) => {
  return new Set(cards.map((it) => new Date(it.startTime).toDateString()));
};

export const setDateTime = (date) => {
  return moment(date).toISOString();
};

export const formatDateAfterPick = (date) => {
  return moment(date, `DD/MM/YYYY HH:mm`);
};

export const getDuration = (start, end) => {
  let startTime = moment(start);
  let endTime = moment(end);
  const diff = endTime.diff(startTime);

  if (diff < HOUR_PER_MS) {
    return moment(diff).format(`mm`) + `M`;
  } else if (diff < DAY_PER_MS) {
    return moment(diff).format(`HH`) + `H` + ` ` + moment(diff).format(`mm`) + `M`;
  } else {
    return moment(diff).format(`DD`) + `D` + ` ` + moment(diff).format(`HH`) + `H` + ` ` + moment(diff).format(`mm`) + `M`;
  }
};

export const isPastDate = (startTime, date) => {
  return startTime < Date.parse(date);
};

export const isFutureDate = (startTime, date) => {
  return startTime >= Date.parse(date);
};
