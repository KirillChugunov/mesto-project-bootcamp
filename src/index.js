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
const ProfileAvatar = document.querySelector(".profile__avatar");
export const ProfileSubtitle = document.querySelector(".profile__subtitle");
export const PopupFormTitle = document.querySelector("#input__title");
export const PopupFormSubtitle = document.querySelector("#input__subtitle");
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

// gridBuilder();
//Работает!!!!!

PopupElement.addEventListener("submit", addNewCard);

///////////////////////////////////ВАЛИДАЦИЯ//////////////////////////////////////////////////

enableValidation(validationConfig);

export const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wbf-cohort-6",
  headers: {
    authorization: "d1f78d2c-b56d-404a-8b1d-91f3bcf47ed4",
    "Content-Type": "application/json",
  },
};

// Promise.all([profilePreloadOnStart(), getCardsFromApi()]).then(([userInfo, userCards]) => {
//     ProfileTitle.textContent = userInfo.name,
//     ProfileSubtitle.textContent = userInfo.about
//     ProfileAvatar.src = userInfo.avatar;})

Promise.all([profilePreloadOnStart(), getCardsFromApi()]).then(
  ([user, cardsMassive]) => {
    (ProfileTitle.textContent = user.name),
      (ProfileSubtitle.textContent = user.about);
    ProfileAvatar.src = user.avatar;
    cardsMassive.forEach((card) => {
      createCard(card, user._id);
    });
  }
);
//     res.forEach((cards) => {
//       createCard(cards, userInfo._id)
//     });
// })

function getCardsFromApi() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    return res.json();
  });
  // .then((res) => {
  //   res.forEach((card) => {
  //     createCard(card);
  //   })
  // })
}

/////////////////Функция загрузки данных с сервера при загрузке страницы
export function profilePreloadOnStart() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    return res.json();
  });
  // .then((res) => {
  //   ProfileTitle.textContent = res.name,
  //   ProfileSubtitle.textContent = res.about
  //   ProfileAvatar.src = res.avatar;
  // })
}

profilePreloadOnStart();

// function apitest () {
//   fetch (`${config.baseUrl}/cards`, {
//     headers: config.headers })
//   .then(res => console.log(res))
// }

// apitest();

// .then((data) => {
//   return(data.cohort);
// })
// .catch((err) => {
//   console.log(err);
// });

// console.log(username);

// function apiUserRename () {
//   fetch (`${config.baseUrl}/users/me`, {
//     method: 'POST',
//     headers: config.headers,
//     body: JSON.stringify({
//       name: 1,
//       about: 1
//     })
//   })
//   .then(res => console.log(res));
//   .catch((err) => {
//         console.log(err);
//       });

// }

// apiUserRename()
