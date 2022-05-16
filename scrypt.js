//popup
let popUp = document.getElementById('popup');
let popUpOpen = document.getElementById('open_popup');
let popUpClose = document.getElementById('close_popup');

//savebutton
let sendForm = document.getElementById('save-button');

//elements
let formElement = document.querySelector('.profile__info');
let nameUser = document.querySelector('.profile__info-name');
let jobUser  = document.querySelector('.profile__info-description');
let nameInput = document.querySelector('.popup__container_form-name');
let jobInput  = document.querySelector('.popup__container_form-description');



function popUpActive () {
    popUp.classList.add('active');
    nameInput.value = nameUser.innerText;
    jobInput.value = jobUser.innerText;
};

function popUpRemove () {
    popUp.classList.remove('active');
};

function saveForm () {
    nameInput.innerText = nameUser.value;
    jobInput.innerText = jobUser.value;
    formSubmitHandler(evt);
}


function formSubmitHandler (evt) {
    evt.preventDefault(); 

    nameUser.textContent = nameInput.value; 
    jobUser.textContent = jobInput.value;

    popUpRemove();
};

sendForm.addEventListener('click', formSubmitHandler);

popUpOpen.addEventListener('click', popUpActive);

popUpClose.addEventListener('click', popUpRemove);



