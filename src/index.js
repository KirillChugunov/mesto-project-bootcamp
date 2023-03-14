console.log("I AM ALIVE");
import "./pages/index.css";
import {
  openPopup,
  closePopup,
  handleSubmitTitleForm,
} from "./components/modal.js";
import { gridBuilder, addNewCard, createCard } from "./components/card.js";
import { enableValidation } from "./components/validate.js";

/////////////////Переменные/////////////////////////////////////
export const fullDocument = document.querySelector(".body");
export const popupEditProfile = document.querySelector(".popup__profile-edit");
const ButtonEditProfile = document.querySelector(".profile__edit-button");
const PopupEditCloseButton = popupEditProfile.querySelector(".popup__close");
export const ProfileTitle = document.querySelector(".profile__title");
const ProfileAvatar = document.querySelector(".profile__avatar")
export const ProfileSubtitle = document.querySelector(".profile__subtitle");
export const PopupFormTitle = popupEditProfile.querySelector("#input__title");
export const PopupFormSubtitle =
  popupEditProfile.querySelector("#input__subtitle");
const ButtonAddProfile = document.querySelector(".profile__add-button");
export const PopupElement = document.querySelector(".popup__add-element");
const PopupElementCloseButton = PopupElement.querySelector(".popup__close");
const PopupEditProfileForm = popupEditProfile.querySelector(".popup__form");
export const PopupBigImg = document.querySelector(".img-popup");
export const SectionElements = document.querySelector(".elements");
export const ElementsTemplate =
  document.querySelector("#element__template").content;
const PlaceImgCloseButton = PopupBigImg.querySelector(".popup__close");
export const AddImgFormTitle = document.querySelector("#input__img-caption");
export const AddCaptionFormTitle = document.querySelector("#input__img-link");
const AddImgbutton = PopupElement.querySelector("popup__submit");
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },

  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

/////////////////////ВЫЗОВ ПЕРВОГО ПОПАПА////////////////////////////
ButtonEditProfile.addEventListener("click", function () {
  openPopup(popupEditProfile);
  PopupFormTitle.value = ProfileTitle.textContent;
  PopupFormSubtitle.value = ProfileSubtitle.textContent;
});
/////////////////////////ВЫЗОВ ВТОРОГО ПОПАПА//////////////////////////
ButtonAddProfile.addEventListener("click", function () {
  openPopup(PopupElement);
});
/////////////////////////ЗАКРЫТИЕ ПЕРВОГО ПОПАПА/////////////////////////
PopupEditCloseButton.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

/////////////////////////ЗАКРЫТИЕ ВТОРОГО ПОПАПА/////////////////////////
PopupElementCloseButton.addEventListener("click", function () {
  closePopup(PopupElement);
});
//Листенер сабмита первого поапа
PopupEditProfileForm.addEventListener("submit", handleSubmitTitleForm);
//Функция для слушателя на закрытие по esp



//////////////////ДОБАВЛЕНИЕ ИЗОБРАЖЕНИЙ/////////////////////////

// МАССИВ С ФОТО И ССЫЛКАМИ

//////////////////////////////////////Функция для создания и возвращения карточки///////////////////////////////////

PlaceImgCloseButton.addEventListener("click", function () {
  closePopup(PopupBigImg);
});

gridBuilder();
//Работает!!!!!

PopupElement.addEventListener("submit", addNewCard);

///////////////////////////////////ВАЛИДАЦИЯ//////////////////////////////////////////////////

enableValidation(validationConfig);

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wbf-cohort-6',
  headers: {
    authorization: 'd1f78d2c-b56d-404a-8b1d-91f3bcf47ed4',
    'Content-Type': 'application/json'
  }
}

fetch (`${config.baseUrl}/users/me`, {
  headers: config.headers })
  .then((res) => {
    return res.json()
  })
  .then((element) => {
    renderelements(element);
  })
  .catch((err) => {
    console.log(err);
  }); 

  function renderelements(element) {
    element.forEach(createCard);
  }

  // const username = fetch (`${config.baseUrl}/users/me`, {
  //   headers: config.headers })
  //   .then((res) => {
  //     return res.json()
  //   })
  //   .then((data) => {
  //     return(data.cohort); 
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   }); 

  // console.log(username);