import AbstractComponent from "../components/abstract-component";
import {render, RenderPosition, replace} from "../utils/render";
import Event from "../components/event";
import EditEdit from "../components/edit-event";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController extends AbstractComponent {
  constructor(container, onDataChange, onViewChange) {
    super();

    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._eventComponent = null;
    this._eventEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event) {
    this._eventComponent = new Event(event);
    this._eventEditComponent = new EditEdit(event);

    this._eventComponent.setEditButtonClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setEditCloseButtonClickHandler(() => {
      this._replaceEditToEvent();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToEvent();
    });

    render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  _replaceEditToEvent() {
    this._eventEditComponent.reset();

    replace(this._eventComponent, this._eventEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _replaceEventToEdit() {
    this._onViewChange();

    replace(this._eventEditComponent, this._eventComponent);
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
