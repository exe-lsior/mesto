import { validationConfig, initialCards, buttonProfilePopupOpen, buttonAddCardPopupOpen, nameInput, descriptionInput, profilePopup, newCardPopup} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import './index.css';


//попап редактирования профиля
const popupEditProfile = new PopupWithForm({ 
  popupSelector: '.popup_edit-profile',
  handleFormSubmit: () => {
    userParameters.setUserInfo({
      name: nameInput.value,
      description: descriptionInput.value
    });
    popupEditProfile.close();
   }
 });
 popupEditProfile.setEventListeners();

 const userParameters = new UserInfo ({
  nameSelector: '.profile__info-name',
  descriptionSelector: '.profile__info-description',
});

//функция открытия попапа профиля
function openPopupProfile() {
  popupEditProfile.open();
  popupProfileValidation.resetErrors();
  popupProfileValidation.disableSubmitButton();
  const profileForm = userParameters.getUserInfo();
  nameInput.value = profileForm.name;
  descriptionInput.value = profileForm.description;
};

 //попап добавления карточки
const popupAddCard = new PopupWithForm({ 
  popupSelector: '.popup_add-card',
  handleFormSubmit: (cardData) => {
    cardList.addItem(createCard(cardData));
    popupAddCard.close()
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
buttonAddCardPopupOpen.addEventListener('click', openNewCardPopup);
  
//валидация 
const popupProfileValidation = new FormValidator(validationConfig, profilePopup); 
popupProfileValidation.enableValidation();

const popupAddCardValidation = new FormValidator(validationConfig, newCardPopup); 
popupAddCardValidation.enableValidation();
