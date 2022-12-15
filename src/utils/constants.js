export const validationConfig = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}); 

export const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-52", //переделать название ссылки
  headers: {
    authorization: "1d96c9d1-7b2e-4b4b-a30d-1aa78a278f75",
    "Content-Type": "application/json",
  }
}

export  const initialCards = [ 
    { 
      name: 'Татуин', 
      link: 'https://img4.goodfon.com/wallpaper/nbig/3/ec/return-to-tatooine-robot-sushchestva-postroiki.jpg' 
    }, 
    { 
      name: 'Джеонозис', 
      link: 'https://gameranx.com/wp-content/uploads/2018/11/databank_geonosis_01_169_1d04e086-720x360.jpg' 
    }, 
    { 
      name: 'Корусант', 
      link: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2017/02/Star-Wars-Coruscant.jpg' 
    }, 
    { 
      name: 'Мустафар', 
      link: 'https://www.centax.ru/images/movies/rogue/mustafar-landscape-big.jpeg' 
    }, 
    { 
      name: 'Звезда смерти', 
      link: 'https://images.alphacoders.com/107/107763.jpg' 
      }, 
    { 
      name: 'Эндор', 
      link: 'https://34travel.me/media/upload/images/2019/december/star-wars/1a.jpg' 
    } 
  ]; 

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
