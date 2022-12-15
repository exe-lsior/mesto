export default class Card {
    constructor({ name, link, likes = [], _id, owner = {}, userId, handleCardClick, deleteCard, likeCardHandler }, templateSelector) {
        this._name = name;
        this._link = link;
        this._likesList = likes; // изменить
        this._cardId = _id;
        this._ownerId = owner._id;
        this._currentUserId = userId;

        this._handleCardClick = handleCardClick;
        this._deleteCard = deleteCard;
        this._likeCardHandler = likeCardHandler;

        this._templateSelector = templateSelector;
    }

    _checkCardOwner() {
        if (this._ownerId !== this._currentUserId) {
            this._deleteButton.remove();
        }
    }

    _isCardLiked() {
        return this._likesList
        .find(owner => owner._id === this._currentUserId);
    }

    _showLikesAmount(likes) {
        this._showLikesAmount.textContent = likes.length;
    }

    renderLikes(likes) {
        this.setLikes(likes);
        this._showLikesAmount(this._likesList);
        if (this._isCardLiked()) {
            this._likeButton.classList.add('like_active');
        } else {
            this._likeButton.classList.remove('like_active');
        }
    }

    getId() {
        return this._cardId;
    }

    getLikes() {
        return this._likesList;
    }

    setLikes(likes) {
        this._likesList = likes;
    }

    //берем шаблон
    _getTemplate() {
        const element = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

            return element;
    }

    //генерация карточки
    generateCard() {
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.element__main-like');
        this._deleteButton = this._element.querySelector('.element__delete');
        this._elementImage = this._element.querySelector('.element__image');
        this._elementTitle = this._element.querySelector('.element__main-name');
        this._likesAmount = this._element.querySelector('.element__main-likes')

        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._elementTitle.textContent = this._name;

        this._checkCardOwner()
        this.renderLikes(this._likesList)
        this._setEventListeners();

        return this._element;
    }

    //переключение лайка
    _toggleLike() {
        this._likeButton.classList.toggle('like_active');
    }

    //удаление карточки
    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    //установить слушатели
    _setEventListeners() {
        this._likeButton.addEventListener('click', () => this._likeCardHandler());
        this._deleteButton.addEventListener('click', () => this._deleteCard(this._cardId));
        this._elementImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        })
    }
};