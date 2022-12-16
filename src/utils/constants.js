export const validationConfig = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}); 

export const buttonProfilePopupOpen = document.getElementById('open_popup');
export const avatarImage = document.querySelector('.profile__image');
export const profileName = document.querySelector('.profile__info-name');
export const profileDescription = document.querySelector('.profile__info-description');
export const buttonAvatarPopupOpen = document.querySelector('.profile__image-container');
export const buttonAddCardPopupOpen = document.querySelector('.profile__button-add');
export const nameInput = document.querySelector('.popup__input_name');
export const descriptionInput = document.querySelector('.popup__input_description');
export const avatarInput = document.querySelector('.popup__input-avatar');
export const profilePopup = document.querySelector('.popup_edit-profile');
export const avatarPopup = document.querySelector('.popup_edit-avatar');
export const newCardPopup = document.querySelector('.popup_add-card');
export const popupDeleteCard = document.querySelector('.popup_delete-card')
export const buttonCardDelete = document.querySelector('.element__delete')
