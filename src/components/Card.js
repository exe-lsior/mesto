export default class Card {
    constructor({ cardData, handleCardClick }, templateSelector) {
        this._cardData = cardData;
        this._name = cardData.name;
        this._link = cardData.link;
        this._handleCardClick = handleCardClick;
        this._templateSelector = templateSelector;
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
        this._likeButton = this._element.querySelector('.element__main-like');
        this._elementImage = this._element.querySelector('.element__image');
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._element.querySelector('.element__main-name').textContent = this._name;

        this._setEventListeners();
        return this._element;
    }

    //переключение лайка
    _toggleLike() {
        this._likeButton.classList.toggle('like_active');
    }

    //удаление карточки
    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    //установить слушатели
    _setEventListeners() {
        this._likeButton.addEventListener('click', () => this._toggleLike());
        this._element.querySelector('.element__delete').addEventListener('click', () => this._deleteCard());
        this._elementImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        })
    }
};