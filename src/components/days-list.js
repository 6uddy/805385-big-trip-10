import AbstractComponent from "./abstract-component.js";

export default class DaysList extends AbstractComponent {
  getTemplate() {
    return `<ul class="trip-days">
    </ul>`;
  }
}
