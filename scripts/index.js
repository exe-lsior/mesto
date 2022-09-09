import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { cardData } from './cardData.js';

const validationConfig = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 

//popup 
const popUpProfile = document.getElementById('popup-profile');
const popupAddCard = document.getElementById('el_popup');
const popUpCard = document.getElementById('popup_card');
const buttonPopupProfileOpen = document.getElementById('open_popup');
const popupAddCardOpenButton = document.getElementById('open_el_popup');
const buttonPopUpProfileClose = document.getElementById('close_popup');
const popupAddCardCloseButton = document.getElementById('el_close_popup');
const cardPopUpClose = document.getElementById('cd_close_popup');

//submit form
const profileForm = document.getElementById('popup-form');
//const formInput = profileElement.querySelector('.popup__input');
const cardForm = document.getElementById('el-popup-form');

//popup elements
const nameUser = document.querySelector('.profile__info-name');
const jobUser  = document.querySelector('.profile__info-description');
const nameInput = document.getElementById('name');
const jobInput  = document.getElementById('description');
const placeInput = document.getElementById('place');
const linkInput = document.getElementById('link');
const popUpDescription = document.querySelector('.popup__description');
const popUpImage = document.querySelector('.popup__image');
const cardFormSubmitButton = document.getElementById('save_button')
//const userSaveButton = document.getElementById('save-button')


//шаблон и DOM
const cardsContainer = document.getElementById('elements');
//const elementTemplate = document.getElementById('template');

//открытие попапа
function activatePopUp(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', closeWithEscape);
};

// открываем поп-ап нажатием на картинку
const openPlacePopUp = (name, link) => {
  popUpImage.src = link;
  popUpImage.alt = name;
  popUpDescription.textContent = name;
  activatePopUp(popUpCard);
}
// закрываем поп-ап нажатием на overlay
function closeByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopUp(evt.target);
  }
};

//открытие попапа user
function openProfilePopup() {
  loadUserData();
  activatePopUp(popUpProfile);
}

//закрытие попапа 
function closePopUp(popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', closeWithEscape);
};

//закрытие попапа addElement
function closeAddCardPopUp() {
  closePopUp(popupAddCard);
};

//отправка формы addElement
function handleAddCardFormSubmit (evt) {
  evt.preventDefault();
  
  renderCard({name:placeInput.value, link:linkInput.value});
  
  placeInput.value = '';
  linkInput.value = '';
  
  closePopUp(popupAddCard);
  popupAddCardValidation.resetErrors()
  popupAddCardValidation.disableSubmitButton();
};

//загрузить текушие данные
const loadUserData = () => {
  nameInput.value = nameUser.textContent;
  jobInput.value = jobUser.textContent;
};


//отправка формы user
function handleEditFormSubmit (evt) {
  evt.preventDefault();

  nameUser.textContent = nameInput.value;
  jobUser.textContent = jobInput.value;
  
  popUpProfileValidation.resetErrors();
  popUpProfileValidation.disableSubmitButton();
  closePopUp(popUpProfile);
};

const createCard = (card) => new Card(card, '.template', openPlacePopUp).generateCard();

function renderCard (card) {
  cardsContainer.prepend(createCard(card));
};

cardData.forEach((card) => {
  renderCard(card);
});


function closeWithEscape(evt) {
  if (evt.key === 'Escape') {
    const popUpActive = document.querySelector('.popup_active');
    closePopUp(popUpActive);
  }
}

//слушатели для закрытия кликом по оверлею
popupAddCard.addEventListener('click', closeByOverlay);
popUpCard.addEventListener('click', closeByOverlay);
popUpProfile.addEventListener('click', closeByOverlay);

//кнопка создания карточки
cardForm.addEventListener('submit', handleAddCardFormSubmit);

//кнопка отправки формы User
profileForm.addEventListener('submit', handleEditFormSubmit);

//кнопка открытия попапа User
buttonPopupProfileOpen.addEventListener('click', () => openProfilePopup());

//кнопка закрытия попапа User
buttonPopUpProfileClose.addEventListener('click', () => closePopUp(popUpProfile));

//кнопка закрытия попапа addElement
popupAddCardCloseButton.addEventListener('click', () => closeAddCardPopUp());

//Кнопка закрытия popUpCard
cardPopUpClose.addEventListener('click', () => closePopUp(popUpCard));

//кнопка открытия попапа addElement
popupAddCardOpenButton.addEventListener('click', () => activatePopUp(popupAddCard));

//валидация 
const popupAddCardValidation = new FormValidator(validationConfig, popupAddCard);
const popUpProfileValidation = new FormValidator(validationConfig, popUpProfile);

popupAddCardValidation.enableValidation();
popUpProfileValidation.enableValidation();