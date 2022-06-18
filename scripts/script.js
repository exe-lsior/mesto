 const initialCards = [
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

//popup 
const popUpProfile = document.getElementById('popup-profile');
const popUpElement = document.getElementById('el_popup');
const popUpCard = document.getElementById('popup_card');
const buttonPopupProfileOpen = document.getElementById('open_popup');
const elementPopUpOpen = document.getElementById('open_el_popup');
const buttonPopUpProfileClose = document.getElementById('close_popup');
const elementPopUpClose = document.getElementById('el_close_popup');
const cardPopUpClose = document.getElementById('cd_close_popup');

//submit form
const profileElement = document.getElementById('popup-form');
const formInput = profileElement.querySelector('.popup__input');
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
const elementSaveButton = document.getElementById('save_button')
const userSaveButton = document.getElementById('save-button')


//шаблон и DOM
const cardsContainer = document.getElementById('elements');
const elementTemplate = document.getElementById('template');

//открытие попапа
function activatePopUp(popup) {
popup.classList.add('popup_active');
document.addEventListener('keydown', closeWithEscape);
};

// закрываем поп-ап нажатием на overlay
function closeByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopUp(evt.target);
  }
};

//открытие попапа user
function openProfilePopup() {
nameInput.value = nameUser.textContent;
jobInput.value = jobUser.textContent;
activatePopUp(popUpProfile);
submitButtonInactive(userSaveButton);
}

//закрытие попапа 
function closePopUp(popup) {
popup.classList.remove('popup_active');
document.addEventListener('keydown', closeWithEscape);
};

//закрытие попапа addElement
function removeElementPopUp () {
  closePopUp(popUpElement);
};

//отправка формы addElement
function createElement (evt) {
  evt.preventDefault();
  
  renderCard({name:placeInput.value, link:linkInput.value});
  
  placeInput.value = '';
  linkInput.value = '';
  
  closePopUp(popUpElement);

  submitButtonInactive(elementSaveButton);

  console.log(saveButton)
};

//переключение кнопки лайк
function likeCard (evt)  {
  evt.target.classList.toggle('like_active');
};

//отправка формы user
function submitUserForm (evt) {
  evt.preventDefault();

  nameUser.textContent = nameInput.value;
  jobUser.textContent = jobInput.value;

  closePopUp(popUpProfile);
};

//функция удаления карточки
function deleteCard (evt) {
  evt.target.closest('.element').remove();
}

const createCard = (card) => {
  const { name, link } = card; // это деструктурирующее присваивание.

  const cardElement = elementTemplate.content.cloneNode(true);// получаем шаблон

  const imageElement = cardElement.querySelector('.element__image');
  const descriptionElement = cardElement.querySelector('.element__main-name');

  descriptionElement.textContent = name;
  imageElement.alt = name;
  imageElement.src = link;

  //лайк
  const likebtn = cardElement.querySelector('.element__main-like');
  //кнопка лайк
  likebtn.addEventListener('click', likeCard);
  
  //корзина
  const deleteBtn = cardElement.querySelector('.element__delete');
  //удаление карточки
  deleteBtn.addEventListener('click', deleteCard);

  imageElement.addEventListener('click', cardPopUpOpen);

  function cardPopUpOpen () {
      
    popUpDescription.textContent = name; 
    popUpImage.src = link; 
    popUpImage.alt = name; 
      
    activatePopUp(popUpCard);
  } 
 
  // Завершаем формирование DOM-узла карточки, вешаем слушатели
  return cardElement;
};

function renderCard (card) {
  cardsContainer.prepend(createCard(card));
};

initialCards.forEach((card) => {
  renderCard(card);
});


function closeWithEscape(evt) {
  if (evt.key === 'Escape') {
    const popUpActive = document.querySelector('.popup_active');
    closePopUp(popUpActive);
  }
}

//слушатели для закрытия кликом по оверлею
popUpElement.addEventListener('click', closeByOverlay);
popUpCard.addEventListener('click', closeByOverlay);
popUpProfile.addEventListener('click', closeByOverlay);

//кнопка создания карточки
cardForm.addEventListener('submit', createElement);

//кнопка отправки формы User
profileElement.addEventListener('submit', submitUserForm);

//кнопка открытия попапа User
buttonPopupProfileOpen.addEventListener('click', () => openProfilePopup());

//кнопка закрытия попапа User
buttonPopUpProfileClose.addEventListener('click', () => closePopUp(popUpProfile));

//кнопка закрытия попапа addElement
elementPopUpClose.addEventListener('click', () => removeElementPopUp());

//Кнопка закрытия popUpCard
cardPopUpClose.addEventListener('click', () => closePopUp(popUpCard));

//кнопка открытия попапа addElement
elementPopUpOpen.addEventListener('click', () => activatePopUp(popUpElement));