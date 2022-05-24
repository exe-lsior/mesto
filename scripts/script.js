//popup
let popUp = document.getElementById('popup');
let popUpOpen = document.getElementById('open_popup');
let popUpClose = document.getElementById('close_popup');

//submit form
let sendForm = document.getElementById('popup-form');

//elements
let formElement = document.querySelector('.profile__info');
let nameUser = document.querySelector('.profile__info-name');
let jobUser  = document.querySelector('.profile__info-description');
let nameInput = document.getElementById('popup_name');
let jobInput  = document.getElementById('popup_description');



function popUpActive () {
    popUp.classList.add('popup_active');
    nameInput.value = nameUser.textContent;
    jobInput.value = jobUser.textContent;
};

function popUpRemove () {
    popUp.classList.remove('popup_active');
};

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    nameUser.textContent = nameInput.value; 
    jobUser.textContent = jobInput.value;

    popUpRemove();
};

sendForm.addEventListener('submit', formSubmitHandler);

popUpOpen.addEventListener('click', popUpActive);

popUpClose.addEventListener('click', popUpRemove);

