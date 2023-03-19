import { fullDocument } from "./data.js";

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
  const clearingFormInput = popup.querySelectorAll(".popup__input-clear");
  clearingFormInput.value = "";
  fullDocument.removeEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closePopup(popup);
    }
  });
}
/////////////////Функция закрытия попапа при нажатии Escape
function closeByEscape(e) {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}
