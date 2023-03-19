import "./pages/index.css";
import { openPopup, closePopup } from "./components/modal.js";
import { createCard } from "./components/card.js";
import { enableValidation } from "./components/validate.js";
import {
  profilePreloadOnStart,
  getCardsFromApi,
  renderLoading,
  apiProfilePatch,
  apiAvatarPatch,
  apiAddCardPost,
  renderError
} from "./components/api.js";
import {
  profileAvatarEditButton,
  profileAvatarEditCloseButton,
  buttonAddImg,
  PopupEditCloseButton,
  popupElementCloseButton,
  PopupEditProfileForm,
  placeImgCloseButton,
  popupElement,
  profileAvatarEditPopup,
  buttonEditProfile,
  popupFormSubtitle,
  validationConfig,
  profileTitle,
  profileSubtitle,
  popupFormTitle,
  profileAvatar,
  popupBigImg,
  popupEditProfile,
  profileAvatarInputValue,
  addImgFormTitle, 
  addCaptionFormTitle
} from "./components/data.js";

/////////////////////Попап редактирования аватара
profileAvatarEditButton.addEventListener("click", function () {
  openPopup(profileAvatarEditPopup);
});
profileAvatarEditCloseButton.addEventListener("click", function () {
  closePopup(profileAvatarEditPopup);
});
profileAvatarEditPopup.addEventListener("submit", handleSubmitAvatarEditForm);

function handleSubmitAvatarEditForm(e) {
  e.preventDefault();
  renderLoading(true, profileAvatarEditPopup);
  apiAvatarPatch(profileAvatarInputValue.value);
  closePopup(profileAvatarEditPopup);
}

/////////////////////Попап редактирования профиля:
buttonEditProfile.addEventListener("click", function () {
  openPopup(popupEditProfile);
  popupFormTitle.value = profileTitle.textContent;
  popupFormSubtitle.value = profileSubtitle.textContent;
});
PopupEditProfileForm.addEventListener("submit", handleSubmitTitleForm);

function handleSubmitTitleForm(e) {
  e.preventDefault();
  renderLoading(true, popupEditProfile);
  apiProfilePatch(popupFormTitle.value, popupFormSubtitle.value);
  closePopup(popupEditProfile);
}

PopupEditCloseButton.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

///////////////Попап добавления изображения:
buttonAddImg.addEventListener("click", function () {
  openPopup(popupElement);
});

popupElementCloseButton.addEventListener("click", function () {
  closePopup(popupElement);
});

popupElement.addEventListener("submit", addNewCard);

////////////////Попап большого изображения

placeImgCloseButton.addEventListener("click", function () {
  closePopup(popupBigImg);
});

///////////////Включение валидации
enableValidation(validationConfig);

//////////////Обновление данных профиля с сервера при загрузке страницы:
profilePreloadOnStart();

/////////////Загрузка массива карт

Promise.all([profilePreloadOnStart(), getCardsFromApi()])
.then(
  ([user, cardsMassive]) => {
    (profileTitle.textContent = user.name),
      (profileSubtitle.textContent = user.about);
    profileAvatar.src = user.avatar;
    profileAvatar.alt = `${user.name}-avatar`;
    cardsMassive.forEach((card) => {
      createCard(card, user._id);
    })
  }
)
.catch((error) => console.log(`${error} - ошибка`))
 
    
////////Добавление карточки из попапа
export function addNewCard(e) {
  e.preventDefault();
  renderLoading(true, popupElement);
  apiAddCardPost(addImgFormTitle.value, addCaptionFormTitle.value);
}
