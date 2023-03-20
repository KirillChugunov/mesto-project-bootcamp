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
  renderLoading1
} from "./components/api.js";
import {
  profileAvatarEditButton,
  profileAvatarEditCloseButton,
  buttonAddImg,
  popupEditCloseButton,
  popupCardCloseButton,
  popupEditProfileForm,
  placeImgCloseButton,
  popupCard,
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
  addCaptionFormTitle,
  popups
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
  e.preventDefault()
  renderLoading(true, e.submitter)
  apiAvatarPatch(profileAvatarInputValue.value)
  .then((res) => {
    profileAvatar.src = res.avatar;
    e.target.reset();
    closePopup(profileAvatarEditPopup);
  })
  .catch((error) => console.log(`${error} - ошибка`))
   .finally((res) => {
    renderLoading(false, e.submitter);
  })
 }

/////////////////////Попап редактирования профиля:
buttonEditProfile.addEventListener("click", function () {
  openPopup(popupEditProfile);
  popupFormTitle.value = profileTitle.textContent;
  popupFormSubtitle.value = profileSubtitle.textContent;
});
popupEditProfileForm.addEventListener("submit", handleSubmitTitleForm);

function handleSubmitTitleForm(e) {
  e.preventDefault();
  renderLoading(true, e.submitter);
  apiProfilePatch(popupFormTitle.value, popupFormSubtitle.value)
  .then((res) => {
    (profileTitle.textContent = res.name),
      (profileSubtitle.textContent = res.about);
      e.target.reset();
    closePopup(popupEditProfile);
  })
  .catch((error) => console.log(`${error} - ошибка`))
  .finally((res) => {
    renderLoading(false, e.submitter)
  });
}

popupEditCloseButton.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

///////////////Попап добавления изображения:
buttonAddImg.addEventListener("click", function () {
  openPopup(popupCard);
});

popupCardCloseButton.addEventListener("click", function () {
  closePopup(popupCard);
});

popupCard.addEventListener("submit", addNewCard);

////////////////Попап большого изображения

placeImgCloseButton.addEventListener("click", function () {
  closePopup(popupBigImg);
});

///////////////Включение валидации
enableValidation(validationConfig);

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
  renderLoading(true, e.submitter);
  apiAddCardPost(addImgFormTitle.value, addCaptionFormTitle.value)
  .then((res) => {
    createCard(res, res.owner._id);
  })
  .catch((error) => console.log(`${error} - ошибка`)) 
  .finally((res) => {
    renderLoading(false, e.submitter);
  });
}

////////////Функция развешивателя слушателей на массив попапов
function popupsAddListenersMousedown(popups) {
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
           closePopup(popup)
          }
        if (evt.target.classList.contains('popup__close')) {
           closePopup(popup)
        }})
    })
  }
popupsAddListenersMousedown(popups);

  