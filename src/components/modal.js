import {
  fullDocument,
  ProfileTitle,
  PopupFormTitle,
  ProfileSubtitle,
  PopupFormSubtitle,
  popupEditProfile,
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
  ProfileTitle.textContent = PopupFormTitle.value;
  ProfileSubtitle.textContent = PopupFormSubtitle.value;
  closePopup(popupEditProfile);
}

function closeByEscape(e) {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_opened")
    closePopup(popup);
    console.log("ЯЗАКРЫВАЮСЬ")
  }
};
