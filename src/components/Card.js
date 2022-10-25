export class Card {
    constructor(cardData, templateSelector, openPlacePopUp) {
        this._cardData = cardData;
        this._name = cardData.name;
        this._link = cardData.link;
        this._templateSelector = templateSelector;
        this._openPlacePopUp = openPlacePopUp;
    }

    //берем шаблон
    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    //генерация карточки
    generateCard() {
        this._element = this._getTemplate();
        this._button = this._element.querySelector('.element__main-like');
        this._setEventListeners();
        this._elementImage = this._element.querySelector('.element__image');
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._element.querySelector('.element__main-name').textContent = this._name;

        return this._element;
    }

    //переключение лайка
    _toggleLike() {
        this._button.classList.toggle('like_active');
    }

    //удаление карточки
    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    //установить слушатели
    _setEventListeners() {
        this._button.addEventListener('click', () => this._toggleLike());
        this._element.querySelector('.element__delete').addEventListener('click', () => this._deleteCard());
        this._element.querySelector('.element__image').addEventListener('click', () => this._openPlacePopUp(this._name, this._link));
    }

};