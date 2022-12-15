import { validationConfig, initialCards, avatarImage, profileName, profileDescription, buttonProfilePopupOpen, buttonAvatarPopupOpen, buttonAddCardPopupOpen, nameInput, descriptionInput, profilePopup, avatarPopup, newCardPopup} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import './index.css';

/*fetch('https://mesto.nomoreparties.co/v1/cohort-52/cards', {
  headers: {
    authorization: '1d96c9d1-7b2e-4b4b-a30d-1aa78a278f75',
    'Content-Type': 'application/json',
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); */

//попап редактирования профиля
const popupEditProfile = new PopupWithForm({ 
  popupSelector: '.popup_edit-profile',
  handleFormSubmit: ({ popup_name, popup_description }) => {
    userParameters.setUserInfo({ popup_name, popup_description });
    popupEditProfile.close();
   }
 });
 popupEditProfile.setEventListeners();

 const userParameters = new UserInfo ({
  nameSelector: '.profile__info-name',
  descriptionSelector: '.profile__info-description',
  avatarSelector: '.profile__image'
});

//функция открытия попапа профиля
function openPopupProfile() {
  popupEditProfile.open();
  popupProfileValidation.resetErrors();
  popupProfileValidation.disableSubmitButton();
  const profileForm = userParameters.getUserInfo();
  nameInput.value = profileForm.name;
  descriptionInput.value = profileForm.about;
};

//попап редактирования аватарки
const avatarEditPopup = new PopupWithForm({
  popupSelector: '.popup_edit-avatar',
  handleFormSubmit: ({ popup_avatar }) => {
    userParameters.setUserInfo({ popup_avatar });
    avatarEditPopup.close();
  }
});
avatarEditPopup.setEventListeners();

//функция открытия попапа аватара
function openAvatarPopup() {
  avatarEditPopup.open();
  popupAvatarValidation.resetErrors();
  popupAvatarValidation.disableSubmitButton();
}

 //попап добавления карточки
const popupAddCard = new PopupWithForm({ 
  popupSelector: '.popup_add-card',
  handleFormSubmit: (cardData) => {
    cardList.addItem(createCard(cardData));
    popupAddCard.close();
  }
});
popupAddCard.setEventListeners();

//функция открытия попапа добавления карточки
function openNewCardPopup() {
  popupAddCard.open();
  popupAddCardValidation.resetErrors();
  popupAddCardValidation.disableSubmitButton();
};

//открыть попап с изображением
const popupCard = new PopupWithImage('.popup_card');
popupCard.setEventListeners();

//создание карточки
const createCard = (cardData) => {
  const card = new Card({
    cardData: cardData,
    handleCardClick: (name, link) => {
      popupCard.open(name, link);
    }}, '.template');

    return card.generateCard();
};

//отрисовка карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, '.elements');

cardList.renderItems();

//слушатели
buttonProfilePopupOpen.addEventListener('click', openPopupProfile);
buttonAvatarPopupOpen.addEventListener('click', openAvatarPopup);
buttonAddCardPopupOpen.addEventListener('click', openNewCardPopup);
  
//валидация 
const popupProfileValidation = new FormValidator(validationConfig, profilePopup); 
popupProfileValidation.enableValidation();

const popupAvatarValidation = new FormValidator(validationConfig, avatarPopup);
popupAvatarValidation.enableValidation();

const popupAddCardValidation = new FormValidator(validationConfig, newCardPopup); 
popupAddCardValidation.enableValidation();

document.addEventListener("click", function (e) {
  console.log(e.target);
});
