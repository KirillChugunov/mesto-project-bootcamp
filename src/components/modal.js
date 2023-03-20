////////////////////Функция открытия попапа////////////////////
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape)
}

////////////////////Функция закрытия попапа/////////////////////////
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape)
}
/////////////////Функция закрытия попапа при нажатии Escape
export function closeByEscape(e) {
  if (e.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}
