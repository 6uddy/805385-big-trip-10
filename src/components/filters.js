import {createElement} from "./../util.js";

export default class Filters {
  constructor(filtersNames) {
    this._filtersNames = filtersNames;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }

  getTemplate() {
    return `<form class="trip-filters" action="#" method="get">
    ${this._filtersNames.map((name) => `<div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name.toLowerCase()}" checked>
    <label class="trip-filters__filter-label" for="filter-${name.toLowerCase()}">${name}</label>
    </div>`).join(``)}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
  }
}
