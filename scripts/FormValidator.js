export class FormValidator {
    constructor(classes, formProfileElement) {
        this._inputSelector = classes.inputSelector;
        this._submitButtonSelector = classes.submitButtonSelector;
        this._inactiveButtonClass = classes.inactiveButtonClass;
        this._inputErrorClass = classes.inputErrorClass;
        this._errorClass = classes.errorClass;
        
        this._formProfileElement = formProfileElement; 
        this._buttonElement = this._formProfileElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formProfileElement.querySelectorAll(this._inputSelector));
    }

    //показать ошибку
    _showInputError(inputElement, errorMessage)  {
        const errorElement = this._formProfileElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    //скрыть
    _hideInputError(inputElement) {
        const errorElement = this._formProfileElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    //проверпить валидность
    _checkInputValidity(inputElement)  {
        if (!inputElement.validity.valid) {
          const errorMessage = inputElement.validationMessage;
          this._showInputError(inputElement, errorMessage);
        } else {
          this._hideInputError(inputElement);
        }
    };

    //проверить наличие невалидных полей
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
    };

    //кнопка неактивна
    _submitButtonInactive() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
    };

    //кнопка активна
    _submitButtonActive() {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.disabled = false;
    }; 
    
    //переключение кнопки
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._submitButtonInactive();
        } else {
            this._submitButtonActive();
        }
    }

    //установить слушатели
    _setEventListeners () {
        this._toggleButtonState()

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement)
                this._toggleButtonState();
            });
        });
    }

    //сбросить ошибки
    resetError() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }

    enableValidation() {
        this._setEventListeners();
    }
}
