import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor ({ popupSelector, handleFormSubmit }) {
        super(popupSelector);

        this._handleFormSubmit = handleFormSubmit;

        this._form = this._popup.querySelector('.popup__form'); 
        this._buttonPopupSubmit = this._form.querySelector('.popup__button');
        this._inputList = this._form.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._formList = {};
        this._inputList.forEach((input) => {
            this._formList[input.name] = input.value;
        });

        return this._formList;
    }

    setEventListeners(){
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close(){
        super.close()

        this._form.reset();
    }
};