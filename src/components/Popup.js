export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    
    open() {
        this._popup.classList.add('popup_active');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_active');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        };
    }

    _handleOverlayClose(evt) {
        if (evt.target === evt.currentTarget) {
                this.close();
            };
    }

    setEventListeners() {
        this._popupCloseButton = this._popup.querySelector('.popup__close-icon');

        this._popupCloseButton.addEventListener('click', () => {
            this.close();
        });
        this._popup.addEventListener('mousedown', (evt) => {
            this._handleOverlayClose(evt);
        });
    }
};