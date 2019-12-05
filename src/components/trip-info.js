export const getTripInfoTemplate = (cities, datesStart, datesEnd) => `<div class="trip-info__main">
${cities.length > 3 ?
  `<h1 class="trip-info__title">${cities[0]} &mdash; ... &mdash; ${cities[cities.length - 1]}</h1>` :
  `<h1 class="trip-info__title">${cities[0]} &mdash; ${cities[1]} &mdash; ${cities[2]}</h1>`}

<p class="trip-info__dates">${new Date(datesStart[0]).toDateString().slice(4)}&nbsp;&mdash;&nbsp;${new Date(datesEnd[datesEnd.length - 1]).toDateString().slice(4)}</p>

</div>`;
