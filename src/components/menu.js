import AbstractComponent from "./abstract-component.js";

export default class Menu extends AbstractComponent {
  constructor(values) {
    super();
    this._values = values;
  }

  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
    ${this._values.map((value) => `<a class="trip-tabs__btn  ${value.active ? `trip-tabs__btn--active` : ``}" href="#">${value.title}</a>`).join(``)}

    </nav>`;
  }
}
