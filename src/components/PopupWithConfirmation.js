import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._popupButton = this._popup.querySelector('.popup__button')
    }

    setConfirmAction(callback) {
        this._confirmDeleteCallback = callback;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupButton.addEventListener('click', () => {
            this._confirmDeleteCallback();
        });
    }

    toggleStatus(isLoading) {
        if (isLoading) {
            this._popupButton.textContent = 'Удаление...'
        } else {
            this._popupButton.textContent = 'Да';
        }
    }
}