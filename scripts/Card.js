export class Card {
    constructor(initialCards, templateSelector, openPlacePopUp) {
        this._initialCards = initialCards;
        this._name = initialCards.name;
        this._link = initialCards.link;
        this._templateSelector = templateSelector;
        this._openPlacePopUp = openPlacePopUp;
    }

    _getTemplate() {
        return document
            .querySelector('.template')
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    generateCard() {
        this._element = this._getTemplate();
        this.button = this._element.querySelector('.element__main-like');
        this._setEventListeners();
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element__main-name').textContent = this._name;
        
        return this._element;
    }

    _toggleLike() {
        this.button.classList.toggle('like_active');
    }

    _deleteCard() {
        this._element.remove()
    }

    _setEventListeners() {
        this.button.addEventListener('click', () => this._toggleLike());
        this._element.querySelector('.element__delete').addEventListener('click', () => this._deleteCard());
        this._element.querySelector('.element__image').addEventListener('click', () => this._openPlacePopUp(this._name, this._link));
    }

};