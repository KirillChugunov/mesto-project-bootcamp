/////////////////Переменные/////////////////////////////////////
const fullDocument = document.querySelector(".body");
const popupEditProfile = document.querySelector(".popup__profile-edit");
const ButtonEditProfile = document.querySelector(".profile__edit-button");
const PopupEditCloseButton = popupEditProfile.querySelector(".popup__close");
const ProfileTitle = document.querySelector(".profile__title");
const ProfileSubtitle = document.querySelector(".profile__subtitle");
const PopupFormTitle = popupEditProfile.querySelector("#input__title");
const PopupFormSubtitle = popupEditProfile.querySelector("#input__subtitle");
const ButtonAddProfile = document.querySelector(".profile__add-button");
const PopupElement = document.querySelector(".popup__add-element");
const PopupElementCloseButton = PopupElement.querySelector(".popup__close");
const PopupEditProfileForm = popupEditProfile.querySelector(".popup__form");
const PopupBigImg = document.querySelector(".img-popup");
const SectionElements = document.querySelector(".elements");
const ElementsTemplate = document.querySelector("#element__template").content;
const PlaceImgCloseButton = PopupBigImg.querySelector(".popup__close");
const AddImgFormTitle = document.querySelector(".form__field_elements_title");
const AddCaptionFormTitle = document.querySelector(
  ".form__field_elements_subtitle"
);
const AddImgbutton = document.querySelector(".elemnt__submit");

////////////////////Функция открытия попапа////////////////////
function openPopup(popup) {
  popup.classList.add("popup_opened");
  fullDocument.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closePopup(popup);
    }
  });
  popup.addEventListener("click", function (evt) {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
}
////////////////////Функция закрытия попапа/////////////////////////
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  PopupFormTitle.value = "";
  PopupFormSubtitle.value = "";
  fullDocument.removeEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closePopup(popup);
    }
  });
}

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
//////////////////////////САМБИТ ПЕРВОГО ПОПАПА////////////////////////////
function handleSubmitTitleForm(e) {
  e.preventDefault();
  ProfileTitle.textContent = PopupFormTitle.value;
  ProfileSubtitle.textContent = PopupFormSubtitle.value;
  closePopup(popupEditProfile);
}

PopupEditProfileForm.addEventListener("submit", handleSubmitTitleForm);

//////////////////ДОБАВЛЕНИЕ ИЗОБРАЖЕНИЙ/////////////////////////

// МАССИВ С ФОТО И ССЫЛКАМИ
const initialCards = [
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

//////////////////////////////////////Функция для создания и возвращения карточки///////////////////////////////////
function buildcard(element) {
  //Клонировали заготовку
  const PlaceElement =
    ElementsTemplate.querySelector(".elements__card").cloneNode(true);
  //Заполнили название фото
  PlaceElement.querySelector(".elements__caption").textContent = element.name;
  //Нашли фото в карточке:
  const PlaceImg = PlaceElement.querySelector(".elements__photo");
  //Заполнили фото и атрибут alt
  PlaceImg.src = element.link;
  PlaceImg.alt = PlaceElement.textContent;
  //Повесили слушателя на изображение на открытие попапа
  PlaceImg.addEventListener("click", function () {
    openPopup(PopupBigImg);
    const BigImg = document.querySelector(".img-popup__figure");
    BigImg.src = PlaceImg.src;
    const BigCaption = document.querySelector(".img-popup__caption");
    BigCaption.textContent = element.name;
  });
  // Нашли кнопку удаления
  const ImgDeleteButton = PlaceElement.querySelector(
    ".elements__delete-button"
  );
  //Повесили слушателя на удаление:
  ImgDeleteButton.addEventListener("click", function () {
    const CardItem = ImgDeleteButton.closest(".elements__card");
    CardItem.remove();
  });
  //Нашли кнопку лайка
  const LikeButton = PlaceElement.querySelector(".elements__heart-button");
  //Повесили слушателя на лайк:
  LikeButton.addEventListener("click", function () {
    LikeButton.classList.toggle("elements__heart-button_active");
  });
  return PlaceElement;
}

PlaceImgCloseButton.addEventListener("click", function () {
  closePopup(PopupBigImg);
});

//Функция добавления карты в верстку
function createCard(element) {
  const card = buildcard(element);
  SectionElements.prepend(card);
}

//Добавляем карты из массива:
function gridBuilder() {
  initialCards.forEach(createCard);
}
gridBuilder();
//Работает!!!!!

function addNewCard(e) {
  e.preventDefault();
  const card = {
    name: AddImgFormTitle.value,
    link: AddCaptionFormTitle.value,
  };
  createCard(card);
  closePopup(PopupElement);
}
PopupElement.addEventListener("submit", addNewCard);

///////////////////////////////////ВАЛИДАЦИЯ//////////////////////////////////////////////////
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__textinput",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass:"popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function checkInputValidity(formElement, inputElement, validationConfig) {
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

function showInputError(
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
  console.log("импутэррор" + errorElement);
}

function hideInputError(formElement, inputElement, validationConfig) {
  console.log("hideInputError works");
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
  console.log("toggleButtonState works");
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function hasInvalidInput(inputList) {
  console.log("hasInvalidInput works");
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function setEventListeners(formElement) {
  console.log("setEventListeners works");
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  console.log(inputList);
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
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

function enableValidation(validationConfig) {
  console.log("enableValidation works");
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  console.log(formList);
  formList.forEach((formElement) => {
      setEventListeners(formElement);
      console.log(formElement);
    });
  };


enableValidation(validationConfig);
