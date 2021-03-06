import AbstractComponent from "../components/abstract-component";
import {render, RenderPosition, replace, remove} from "../utils/render";
import Event from "../components/event";
import EditEdit from "../components/edit-event";
import Point from "../models/point";
import {formatDateAfterPick} from "../utils/common";

const SHAKE_ANIMATION_TIMEOUT = 500;

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`
};

const EmptyEvent = {
  type: `taxi`,
  destination: ``,
  startTime: Date.parse(new Date()),
  endTime: Date.parse(new Date()),
  offers: [],
  description: ``,
  price: 0,
  isFavorite: false
};

const parseFormData = (formData, offers) => {
  const desc = document.querySelector(`.event__destination-description`).textContent;
  let pictures = [];
  document.querySelectorAll(`.event__photo`).forEach((it) => {
    pictures.push({src: it.src, desc: it.alt});
  });

  return new Point({
    'type': formData.get(`event-type`),
    'destination': {
      'name': formData.get(`event-destination`),
      'description': desc,
      'pictures': pictures.map((it) => {
        return {
          'src': `` + it.src,
          'description': `` + it.desc,
        };
      }),
    },
    'date_from': formatDateAfterPick(formData.get(`event-start-time`)),
    'date_to': formatDateAfterPick(formData.get(`event-end-time`)),
    'offers': offers,
    'base_price': Number(formData.get(`event-price`)),
    'is_favorite': Boolean(formData.get(`event-favorite`))
  });
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

  render(event, mode) {
    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;
    this._mode = mode;

    this._eventComponent = new Event(event);
    this._eventEditComponent = new EditEdit(event);

    this._eventComponent.setEditButtonClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setEditCloseButtonClickHandler(() => {
      this._eventEditComponent.setData({
        saveButtonText: `Saving...`,
      });

      const pointData = this._eventEditComponent.getData();
      const data = parseFormData(pointData.form, pointData.offers);

      this._onDataChange(this, event, data);
      this._replaceEditToEvent();

      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();

      this._eventEditComponent.setData({
        saveButtonText: `Saving...`,
      });

      const pointData = this._eventEditComponent.getData();
      const data = parseFormData(pointData.form, pointData.offers);
      this._onDataChange(this, event, data);
      this._replaceEditToEvent();
    });

    this._eventEditComponent.setDeleteButtonClickHandler(() => {
      this._eventEditComponent.setData({
        deleteButtonText: `Deleting...`,
      });

      this._onDataChange(this, event, null);
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventEditComponent && oldEventComponent) {
          replace(this._eventComponent, oldEventComponent);
          replace(this._eventEditComponent, oldEventEditComponent);
          this._replaceEditToEvent();
        } else {
          render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldEventEditComponent && oldEventComponent) {
          remove(oldEventComponent);
          remove(oldEventEditComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._eventEditComponent, RenderPosition.AFTERBEGIN);
        this._eventEditComponent.deleteEventCloseButton();
        this._eventEditComponent.setData({
          deleteButtonText: `Cancel`,
        });
        break;
    }
  }

  shake() {
    this._eventEditComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._eventComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._eventEditComponent.getElement().style.animation = ``;
      this._eventComponent.getElement().style.animation = ``;

      this._eventEditComponent.setData({
        saveButtonText: `Save`,
        deleteButtonText: `Delete`,
      });
    }, SHAKE_ANIMATION_TIMEOUT);
  }


  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);

    this._eventEditComponent.reset();

    if (document.contains(this._eventEditComponent.getElement())) {
      replace(this._eventComponent, this._eventEditComponent);
    }
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
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyEvent, null);
      }
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  destroy() {
    remove(this._eventEditComponent);
    remove(this._eventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}

export {Mode, EmptyEvent};
