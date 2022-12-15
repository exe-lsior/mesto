import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._popupButton = this._popup.querySelector('.popup__button')
    }

    setConfirmAcction(callback) {
        this._confirmDeleteCallback = callback;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupButton.addEventListener('click', () => {
            this._confirmDeleteCallback()
        })
    }
}