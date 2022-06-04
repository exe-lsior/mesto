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
let popUp = document.getElementById('popup');
let elPopUp = document.getElementById('el_popup');
let cdPopUp = document.getElementById('popup_card');
let popUpOpen = document.getElementById('open_popup');
let elPopUpOpen = document.getElementById('open_el_popup');
let popUpClose = document.getElementById('close_popup');
let elPopUpClose = document.getElementById('el_close_popup');
let cdPopUpClose = document.getElementById('cd_close_popup');

//submit form
let sendForm = document.getElementById('popup-form');
let sendElForm = document.getElementById('el-popup-form');

//popup elements
let formElement = document.querySelector('.profile__info');
let nameUser = document.querySelector('.profile__info-name');
let jobUser  = document.querySelector('.profile__info-description');
let nameInput = document.getElementById('popup_name');
let jobInput  = document.getElementById('popup_description');
let placeInput = document.getElementById('place_name');
let linlInput = document.getElementById('place_link');
let popUpDsc = document.querySelector('.popup__description');
let popUpImg = document.querySelector('.popup__image');





//шаблон и DOM
let els = document.getElementById('elements');
let elemTemplate = document.getElementById('template');
//image
let elImg = elemTemplate.content.getElementById('img');
let elName = elemTemplate.content.getElementById('elName');

//check
let elements = document.getElementById('elements');

//открытие попапа User
function popUpActive () {
    popUp.classList.add('popup_active');
    nameInput.value = nameUser.textContent;
    jobInput.value = jobUser.textContent;
};
//кнопка открытия попапа User
popUpOpen.addEventListener('click', popUpActive);

//закрытие попапа User
function popUpRemove () {
    popUp.classList.remove('popup_active');
};
//кнопка закрытия попапа User
popUpClose.addEventListener('click', popUpRemove);

//открытие попапа addElement
function elPopUpActive () {
    elPopUp.classList.add('popup_active');

    placeInput.value = placeInput.value; 
    elImg.src = linlInput.value;
};
//кнопка открытия попапа addElement
elPopUpOpen.addEventListener('click', elPopUpActive);

//закрытие попапа addElement
function elPopUpRemove () {
    elPopUp.classList.remove('popup_active');
    placeInput.value = '';
    linlInput.value = '';
};
//кнопка закрытия попапа addElement
elPopUpClose.addEventListener('click', elPopUpRemove);

//отправка формы addElement
function elFormSubmitHandler (evt) {
    evt.preventDefault(); 
    
    let el = elemTemplate.content.cloneNode(true);

    let elImgage = el.querySelector('.element__image')
    let elDescription = el.querySelector('.element__main-name')

    elDescription.textContent = placeInput.value;
    elImgage.src = linlInput.value;
    elImgage.alt = placeInput.value;
    
    
    els.prepend(el);


    placeInput.value = '';
    linlInput.value = '';

    elPopUpRemove();

    //лайк
    let likebtn = document.getElementById('like');
    //кнопка лайк
    likebtn.addEventListener('click', cardLike);

    //корзина
    let deleteBtn = document.getElementById('delete');
    //удаление карточки
    deleteBtn.addEventListener('click', deleteCard);

    let cdImg = document.querySelector('.element__image')
    //Кнопка открытия cdPopUp
    elImgage.addEventListener('click', cdPopUpOpen);

    //функция открытия cdPopUp
    function cdPopUpOpen () {
        
        popUpDsc.textContent = elDescription.textContent;
        popUpImg.src = elImgage.src;
        popUpImg.alt = elDescription.value;
        
        cdPopUp.classList.add('popup_active');
    }
    
};

//переключение кнопки лайк
function cardLike (evt)  {
    evt.target.classList.toggle('like_active');
};

//кнопка отправки формы User
sendElForm.addEventListener('submit', elFormSubmitHandler);

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    nameUser.textContent = nameInput.value; 
    jobUser.textContent = jobInput.value;

    popUpRemove();
};

//кнопка отправки формы User
sendForm.addEventListener('submit', formSubmitHandler);

//функция удаления карточки
function deleteCard (evt) {
    evt.target.closest('.element').remove();
}

//Функция закрытия cdPopUp
function cdPopUpRemove () {
    cdPopUp.classList.remove('popup_active');
};

//Кнопка закрытия cdPopUp
cdPopUpClose.addEventListener('click', cdPopUpRemove);

//цикл добавления карточек через массив
initialCards.forEach (function (element) {
    let el = elemTemplate.content.cloneNode(true);

    let elImgage = el.querySelector('.element__image')
    let elDescription = el.querySelector('.element__main-name')

    el.querySelector('.element__image').src = element.link;
    el.querySelector('.element__main-name').textContent = element.name;

    els.prepend(el);
    
    //корзина
    let deleteBtn = document.getElementById('delete');
    //удаление карточки
    deleteBtn.addEventListener('click', deleteCard);

    //лайк
    let likebtn = document.getElementById('like');
    //кнопка лайк
    likebtn.addEventListener('click', cardLike);
    

    function cdPopUpOpen () {
        
        popUpDsc.textContent = elDescription.textContent;
        popUpImg.src = elImgage.src;
        popUpImg.alt = elDescription.value;
        
        cdPopUp.classList.add('popup_active');
    }
    
    let msImg = document.querySelector('.element__image');
    msImg.addEventListener('click', cdPopUpOpen);
    
})
