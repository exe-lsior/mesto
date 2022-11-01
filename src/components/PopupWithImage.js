import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
    constructor (popupSelector) {
        super(popupSelector);

        this._image = this._popup.querySelector('.popup__image');
        this._descriptionImage = this._popup.querySelector('.popup__description');
        
    }

    open(name, link){
        super.open()
        
        this._image.src = link;
        this._descriptionImage.alt = name;
        this._descriptionImage.textContent = name;
    }
};