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
const popUpOpen = document.getElementById('open_popup');
const elementPopUpOpen = document.getElementById('open_el_popup');
const popUpClose = document.getElementById('close_popup');
const elementPopUpClose = document.getElementById('el_close_popup');
const cardPopUpClose = document.getElementById('cd_close_popup');

//submit form
const profileElement = document.getElementById('popup-form');
const cardElement = document.getElementById('el-popup-form');

//popup elements
const nameUser = document.querySelector('.profile__info-name');
const jobUser  = document.querySelector('.profile__info-description');
const nameInput = document.getElementById('popup_name');
const jobInput  = document.getElementById('popup_description');
const placeInput = document.getElementById('place_name');
const linkInput = document.getElementById('place_link');
const popUpDsc = document.querySelector('.popup__description');
const popUpImg = document.querySelector('.popup__image');


//шаблон и DOM
const cardsContainer = document.getElementById('elements');
const elemTemplate = document.getElementById('template');

//открытие попапа
function activatePopUp(popup) {
  popup.classList.add('popup_active');
};

//открытие попапа user
function openProfilePopup() {
  nameInput.value = nameUser.textContent;
  jobInput.value = jobUser.textContent;
  activatePopUp(popUpProfile);
}

//закрытие попапа 
function closePopUp(popup) {
  popup.classList.remove('popup_active');
} ;

//закрытие попапа addElement
function elementPopUpRemove () {
    closePopUp(popUpElement)
    placeInput.value = '';
    linkInput.value = '';
};

//отправка формы addElement
function elFormSubmitHandler (evt) {
    evt.preventDefault(); 
    
    const el = elemTemplate.content.cloneNode(true);

    const elImgage = el.querySelector('.element__image')
    const elDescription = el.querySelector('.element__main-name')

    elDescription.textContent = placeInput.value;
    elImgage.src = linkInput.value;
    elImgage.alt = placeInput.value;
    
    function renderCard(createCard) {
      createCard.prepend(el);
    }
    
    renderCard(cardsContainer);

    placeInput.value = '';
    linkInput.value = '';

    closePopUp(popUpElement);

    //лайк
    const likebtn = document.getElementById('like');
    //кнопка лайк
    likebtn.addEventListener('click', cardLike);

    //корзина
    const deleteBtn = document.getElementById('delete');
    //удаление карточки
    deleteBtn.addEventListener('click', deleteCard);

    const cdImg = document.querySelector('.element__image')
    //Кнопка открытия popUpCard
    elImgage.addEventListener('click', cdPopUpOpen);

    //функция открытия popUpCard
    function cdPopUpOpen () {
        
        popUpDsc.textContent = elDescription.textContent;
        popUpImg.src = elImgage.src;
        popUpImg.alt = elDescription.value;
        
        popUpCard.classList.add('popup_active');
    }
    
};

//переключение кнопки лайк
function cardLike (evt)  {
    evt.target.classList.toggle('like_active');
};

//кнопка отправки формы User
cardElement.addEventListener('submit', elFormSubmitHandler);

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    nameUser.textContent = nameInput.value; 
    jobUser.textContent = jobInput.value;

    closePopUp(popUpProfile);
};

//кнопка отправки формы User
profileElement.addEventListener('submit', formSubmitHandler);

//функция удаления карточки
function deleteCard (evt) {
    evt.target.closest('.element').remove();
}



//цикл добавления карточек через массив
initialCards.forEach (function (element) {
    const el = elemTemplate.content.cloneNode(true);

    const elImgage = el.querySelector('.element__image')
    const elDescription = el.querySelector('.element__main-name')

    el.querySelector('.element__image').src = element.link;
    el.querySelector('.element__main-name').textContent = element.name;

    function renderCard(createCard) {
      createCard.prepend(el);
    }

    renderCard(cardsContainer);
    
    //корзина
    const deleteBtn = document.getElementById('delete');
    //удаление карточки
    deleteBtn.addEventListener('click', deleteCard);

    //лайк
    const likebtn = document.getElementById('like');
    //кнопка лайк
    likebtn.addEventListener('click', cardLike);
    

    function cardPopUpOpen () {
        
        popUpDsc.textContent = elDescription.textContent;
        popUpImg.src = elImgage.src;
        popUpImg.alt = elDescription.value;
        
        popUpCard.classList.add('popup_active');
    }
    
    const msImg = document.querySelector('.element__image');
    msImg.addEventListener('click', cardPopUpOpen);
    
})


//кнопка закрытия попапа User
popUpClose.addEventListener('click', () => closePopUp(popUpProfile));

//кнопка закрытия попапа addElement
elementPopUpClose.addEventListener('click', () => elementPopUpRemove ());

//Кнопка закрытия popUpCard
cardPopUpClose.addEventListener('click', () => closePopUp(popUpCard));

//кнопка открытия попапа addElement
elementPopUpOpen.addEventListener('click', () => activatePopUp(popUpElement));

//кнопка открытия попапа User
popUpOpen.addEventListener('click', () => openProfilePopup());