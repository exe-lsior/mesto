import { validationConfig, avatarImage, profileName, profileDescription, buttonProfilePopupOpen, buttonAvatarPopupOpen, buttonAddCardPopupOpen, nameInput, descriptionInput, profilePopup, avatarPopup, newCardPopup, apiConfig, buttonCardDelete} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';
import './index.css';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

const api = new Api(apiConfig);

let currentUserId = null;

//попап редактирования профиля
const popupEditProfile = new PopupWithForm({ 
  popupSelector: '.popup_edit-profile',
  handleFormSubmit: ({ name, description }) => {
    popupEditProfile.loadingState(true);
    api.editProfileInfo({ name, description })
      .then((res) => {
        userParameters.setUserInfo(res);
        popupEditProfile.close()
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        popupEditProfile.loadingState(false);
      });
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
  const profileForm = userParameters.getUserInfo();
  nameInput.value = profileForm.name;
  descriptionInput.value = profileForm.description;
  popupEditProfile.open();
  popupProfileValidation.resetErrors();
  popupProfileValidation.disableSubmitButton();
};

//попап редактирования аватарки
const avatarEditPopup = new PopupWithForm({
  popupSelector: '.popup_edit-avatar',
  handleFormSubmit: ({ avatar }) => {
    avatarEditPopup.loadingState(true);
    api.editAvatar(avatar)
      .then((res) => {
        userParameters.setUserInfo(res);
        avatarEditPopup.closePopup();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        avatarEditPopup.loadingState(false);
      })
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
  handleFormSubmit: ({ elementTitle, elementLink }) => {
    popupAddCard.loadingState(true);
    api.addNewElementCard({ elementTitle, elementLink })
      .then((res) => {
        cardList.addItem(createCard(res));
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        popupAddCard.loadingState(false)
      })
  }
});
popupAddCard.setEventListeners();

//попап удаления карточки
const popupDeleteCard = new PopupWithConfirmation('.popup_delete-card')

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

const createCard = ({ name, link, likes, _id, owner }) => {
  const card = new Card({
    name,
    link,
    likes,
    _id,
    owner,
    userId: userParameters.getUserId(),
    handleCardClick: (name, link) => {
        popupCard.open(name, link);
    },

    deleteCard: (cardId) => {
      popupDeleteCard.open();
      popupDeleteCard.setConfirmAction(() => {
        popupDeleteCard.loadingState(true);
        api.deleteElementCard(cardId)
        .then(() => {
          card.cardDelete();
          popupDeleteCard.close();
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        })
        .finally(() => {
          popupDeleteCard.loadingState(false);
        })
      });
    },
    

    likeCardHandler: () => {
      const stateLike = card.getLikes()
      .find(owner => owner._id === userParameters._id);

      if(!stateLike) {
        api.setLike(card.getId())
        .then((res) => {
          card.renderLikes(res.likes);
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
      } else {
        api.removeLike(card.getId())
        .then((res) => {
          card.renderLikes(res.likes);
        })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
      }        
    },
  }, '#template');
    
    return card.generateCard();
};


//отрисовка карточек
const cardList = new Section({
  renderer: (initialCards) => {
    cardList.addItem(createCard(initialCards));
  }
}, '.elements');

//получить инфо о пользователе заполнить данные с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, cards]) => {
    currentUserId = userData._id;
    userParameters.setUserInfo(userData);
    cardList.renderItems(cards);
})
.catch((err) => {
    console.log(`Ошибка сука${err}`)
});


//слушатели
buttonProfilePopupOpen.addEventListener('click', openPopupProfile);
buttonAvatarPopupOpen.addEventListener('click', openAvatarPopup);
buttonAddCardPopupOpen.addEventListener('click', openNewCardPopup);
//buttonCardDelete.addEventListener('click', openDeletePopup);
  
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
