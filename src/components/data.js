export const fullDocument = document.querySelector(".body");
export const popupEditProfile = document.querySelector(".popup__profile-edit");
export const buttonEditProfile = document.querySelector(
  ".profile__edit-button"
);
export const PopupEditCloseButton =
  popupEditProfile.querySelector(".popup__close");
export const profileTitle = document.querySelector(".profile__title");
export const profileAvatar = document.querySelector(".profile__avatar");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const popupFormTitle = document.querySelector("#input__title");
export const popupFormSubtitle = document.querySelector("#input__subtitle");
export const buttonAddImg = document.querySelector(".profile__add-button");
export const popupElement = document.querySelector(".popup__add-element");
export const popupElementSubmitbutton =
  popupElement.querySelector(".popup__submit");
export const popupElementCloseButton =
  popupElement.querySelector(".popup__close");
export const popupEditProfileForm =
  popupEditProfile.querySelector(".popup__form");
export const popupBigImg = document.querySelector(".img-popup");
export const sectionElements = document.querySelector(".elements");
export const elementsTemplate =
  document.querySelector("#element__template").content;
export const placeImgCloseButton = popupBigImg.querySelector(".popup__close");
export const addImgFormTitle = document.querySelector("#input__img-caption");
export const addCaptionFormTitle = document.querySelector("#input__img-link");
const AddImgbutton = popupElement.querySelector("popup__submit");
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
export const profileAvatarEditButton = document.querySelector(
  ".profile__avatar-button"
);
export const profileAvatarEditPopup = document.querySelector(
  ".popup__avatar-edit"
);
export const profileAvatarEditCloseButton =
  document.querySelector(".popup__close");
export const profileAvatarInputValue = document.querySelector("#input__avatar");
