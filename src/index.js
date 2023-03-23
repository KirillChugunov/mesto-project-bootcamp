import "./pages/index.css";
import { openPopup, closePopup } from "./components/modal.js";
import { createCard } from "./components/card.js";
import { enableValidation } from "./components/validate.js";
import {
  preloadProfileOnStart,
  getCardsFromApi,
  renderLoading,
  patchProfileApi,
  patchAvatarApi,
  addApiCardPost,
} from "./components/api.js";
import {
  profileAvatarEditButton,
  buttonAddImg,
  popupEditProfileForm,
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

profileAvatarEditPopup.addEventListener("submit", handleSubmitAvatarEditForm);

function handleSubmitAvatarEditForm(e) {
  e.preventDefault()
  renderLoading(true, e.submitter)
  patchAvatarApi(profileAvatarInputValue.value)
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
  patchProfileApi(popupFormTitle.value, popupFormSubtitle.value)
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

///////////////Попап добавления изображения:
buttonAddImg.addEventListener("click", function () {
  openPopup(popupCard);
});

popupCard.addEventListener("submit", addNewCard);

///////////////Включение валидации
enableValidation(validationConfig);

/////////////Загрузка массива карт

Promise.all([preloadProfileOnStart(), getCardsFromApi()])
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
  addApiCardPost(addImgFormTitle.value, addCaptionFormTitle.value)
  .then((res) => {
    createCard(res, res.owner._id);
    closePopup(popupCard)
    e.target.reset()
  })
  .catch((error) => console.log(`${error} - ошибка`)) 
  .finally((res) => {
    renderLoading(false, e.submitter);
  });
}

////////////Функция развешивателя слушателей на массив попапов
function addClosePopupListeners(popups) {
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
addClosePopupListeners(popups);

  