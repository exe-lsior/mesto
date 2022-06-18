const classes = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_visible');
};
  
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
};


const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  toggleButtonState (inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
     checkInputValidity(formElement, inputElement);

     toggleButtonState (inputList, buttonElement, classes.inactiveButtonClass);
    });
  });
};

function submitButtonInactive(buttonElement) {
  buttonElement.classList.add(classes.inactiveButtonClass);
  buttonElement.disabled = true;
};

function submitButtonActive(buttonElement) {
  buttonElement.classList.remove(classes.inactiveButtonClass);
  buttonElement.disabled = false;
};

const enableValidation = (classes) => {
  const formList = Array.from(document.querySelectorAll(classes.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt){
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation(classes);


function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState (inputList, buttonElement, classes) {
  if (hasInvalidInput(inputList)) {
    submitButtonInactive(buttonElement, classes);
  } else {
    submitButtonActive(buttonElement, classes);
  }
}
