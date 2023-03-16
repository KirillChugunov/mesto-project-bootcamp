import {
  fullDocument,
  ProfileTitle,
  PopupFormTitle,
  ProfileSubtitle,
  PopupFormSubtitle,
  popupEditProfile,
  config
} from "../index.js";
////////////////////Функция открытия попапа////////////////////
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  fullDocument.addEventListener("keydown", closeByEscape);
  popup.addEventListener("click", function (evt) {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
}

////////////////////Функция закрытия попапа/////////////////////////
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  PopupFormTitle.value = "";
  PopupFormSubtitle.value = "";
  fullDocument.removeEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closePopup(popup);
    }
  });
}

//////////////////////////САМБИТ ПЕРВОГО ПОПАПА////////////////////////////
export function handleSubmitTitleForm(e) {
  e.preventDefault();
  apiProfilePatch(PopupFormTitle.value, PopupFormSubtitle.value);
  closePopup(popupEditProfile);
}
//////////Функция отправки данных профайла на сервер
function apiProfilePatch (name, about) {
  fetch (`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    about: about
  })
 })
 .then((res) => {
  return res.json()
})
 .then((res) => {
    ProfileTitle.textContent = res.name,
    ProfileSubtitle.textContent = res.about
  })
}


function closeByEscape(e) {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_opened")
    closePopup(popup);
  }
};
