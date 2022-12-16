import { validationConfig, buttonProfilePopupOpen, buttonAvatarPopupOpen, buttonAddCardPopupOpen, nameInput, descriptionInput, profilePopup, avatarPopup, newCardPopup} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';
import './index.css';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

//токен
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-54",
  headers: {
    authorization: "f4235ef4-85b7-4215-be28-8acef2d83ac1",
    "Content-Type": "application/json",
  }
})

const userParameters = new UserInfo ({
  nameSelector: '.profile__info-name',
  descriptionSelector: '.profile__info-description',
  avatarSelector: '.profile__image'
});

//функция открытия попапа профиля
function openPopupProfile() {
  const profileForm = userParameters.getUserInfo();
  nameInput.value = profileForm.name;
  descriptionInput.value = profileForm.description;
  profileEditPopup.open();
  popupProfileValidation.resetErrors();
  popupProfileValidation.disableSubmitButton();
};

//функция открытия попапа добавления карточки
function openNewCardPopup() {
  popupAddCard.open();
  popupAddCardValidation.resetErrors();
  popupAddCardValidation.disableSubmitButton();
};

//функция открытия попапа аватара
function openAvatarPopup() {
  avatarEditPopup.open();
  popupAvatarValidation.resetErrors();
  popupAvatarValidation.disableSubmitButton();
}

//попап редактирования профиля
const profileEditPopup = new PopupWithForm({ 
  popupSelector: '.popup_edit-profile',
  handleFormSubmit: ({ name, description }) => {
    profileEditPopup.toggleStatus(true);
    api.editProfile({ name, description })
      .then((userData) => {
        userParameters.setUserInfo(userData);
        profileEditPopup.close()
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        profileEditPopup.toggleStatus(false);
      });
   }
 });
 profileEditPopup.setEventListeners();

//попап добавления карточки
const popupAddCard = new PopupWithForm({ 
  popupSelector: '.popup_add-card',
  handleFormSubmit: ({ elementTitle, elementLink }) => {
    popupAddCard.toggleStatus(true);
    api.addNewElement({ elementTitle, elementLink })
      .then((res) => {
        cardList.addItem(createCard(res));
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка добавления карточки: ${err}`);
      })
      .finally(() => {
        popupAddCard.toggleStatus(false)
      })
  }
});
popupAddCard.setEventListeners();

//попап редактирования аватарки
const avatarEditPopup = new PopupWithForm({
  popupSelector: '.popup_edit-avatar',
  handleFormSubmit: ({ avatar }) => {
    avatarEditPopup.toggleStatus(true);
    api.editAvatar(avatar)
      .then((link) => {
        userParameters.setUserInfo(link);
        avatarEditPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка редактирования аватара: ${err}`);
      })
      .finally(() => {
        avatarEditPopup.toggleStatus(false);
      })
  }
});
avatarEditPopup.setEventListeners();

//попап удаления карточки
const popupDeleteCard = new PopupWithConfirmation('.popup_delete-card');
popupDeleteCard.setEventListeners();

//попап с изображением
const popupCard = new PopupWithImage('.popup_card');
popupCard.setEventListeners();

//создание карточки
const createCard = ({ likes, _id, name, link, owner }) => {
  const card = new Card({
    likes,
    _id,
    name,
    link,
    owner,
    userId: userParameters.getUserId(),
    handleCardClick: (name, link) => {
        popupCard.open(name, link);
    },

    deleteCard: (cardId) => {
      popupDeleteCard.open();
      popupDeleteCard.setConfirmAction(() => {
        popupDeleteCard.toggleStatus(true);
        api.deleteElement(cardId)
        .then(() => {
          card.deleteCard();
          popupDeleteCard.close();
        })
        .catch((err) => {
          console.log(`Ошибка удаления карточки: ${err}`);
        })
        .finally(() => {
          popupDeleteCard.toggleStatus(false);
        })
      });
    },
    

    handleCardLike: () => {
      const stateLike = card.getLikes()
      .find(owner => owner._id === userParameters._id);

      if(!stateLike) {
        api.setLike(card.getId())
        .then((response) => {
          card.renderLikes(response.likes);
        })
        .catch((err) => {
          console.log(`Ошибка постановки лайка: ${err}`);
        });
      } else {
        api.removeLike(card.getId())
        .then((response) => {
          card.renderLikes(response.likes);
        })
      .catch((err) => {
        console.log(`Ошибка удаления лайка: ${err}`);
      });
      }        
    },
  }, '.template');
    
    return card.generateCard();
};

//отрисовка карточек
const cardList = new Section({
  renderer: (initialCards) => {
    cardList.addItem(createCard(initialCards));
  }
}, '.elements');

let myId = '';

//получить инфо о пользователе заполнить данные с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, cards]) => {
    myId = userData._id;
    userParameters.setUserInfo(userData);
    cardList.renderItems(cards);
})
.catch((err) => {
    console.log(`Ошибка ${err}`)
});

//слушатели отктрытия попапов
buttonProfilePopupOpen.addEventListener('click', openPopupProfile);
buttonAvatarPopupOpen.addEventListener('click', openAvatarPopup);
buttonAddCardPopupOpen.addEventListener('click', openNewCardPopup);
  
//валидация форм попапов
const popupProfileValidation = new FormValidator(validationConfig, profilePopup); 
popupProfileValidation.enableValidation();

const popupAvatarValidation = new FormValidator(validationConfig, avatarPopup);
popupAvatarValidation.enableValidation();

const popupAddCardValidation = new FormValidator(validationConfig, newCardPopup); 
popupAddCardValidation.enableValidation();
