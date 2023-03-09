import { validationConfig, fullDocument } from "../index.js";
//Проверка валидности элемента
export function checkInputValidity(
  formElement,
  inputElement,
  validationConfig
) {
  console.log("checkvalidity works");
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}
//Показываем/убираем ошибку
export function showInputError(
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) {
  console.log("showInputError works");
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
}

export function hideInputError(formElement, inputElement, validationConfig) {
  console.log("hideInputError works");
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
}

// Стилизация/включение кнопки
export function toggleButtonState(inputList, buttonElement, validationConfig) {
  console.log("toggleButtonState works");
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}
//Колбэк валидности
export function hasInvalidInput(inputList) {
  console.log("hasInvalidInput works");
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
//Вешаем слушателей
export function setEventListeners(formElement) {
  console.log("setEventListeners works");
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  console.log(inputList);
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    console.log(inputElement);
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
      console.log(inputElement);
    });
  });
}
//Включаем валидацию
export function enableValidation(validationConfig) {
  console.log("enableValidation works");
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  console.log(formList);
  formList.forEach((formElement) => {
    setEventListeners(formElement);
    console.log(formElement);
  });
}
