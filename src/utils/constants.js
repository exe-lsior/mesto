export const validationConfig = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}); 

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
export const buttonAddCardPopupOpen = document.querySelector('.profile__button-add');
export const nameInput = document.querySelector('.popup__input_name');
export const descriptionInput = document.querySelector('.popup__input_description');
export const profilePopup = document.querySelector('.popup_edit-profile');
export const newCardPopup = document.querySelector('.popup_add-card');