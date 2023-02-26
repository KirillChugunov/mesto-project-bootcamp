/////////////ВЫЗОВ ПОПАПА ПРОФИЛЯ//////////////
const buttoneditProfile = document.querySelector(".profile__edit-button");
function openPopup() {
  popupFormTitle.value = profileTitle.textContent;
  popupFormSubtitle.value = profileSubtitle.textContent;
  const popup = document.querySelector(".popup");
  popup.classList.add("popup_opened");
}
buttoneditProfile.addEventListener("click", openPopup);
////////////ЗАКРЫТИЕ ПОПАПА ПРОФИЛЯ/////////////////////
const editProfileclosebutton = document.querySelector(".popup__close");
function closePopup() {
  const popup = document.querySelector(".popup");
  popup.classList.remove("popup_opened");
}
editProfileclosebutton.addEventListener("click", closePopup);
///////////////////НАПОЛНЕНИЕ ПОПАПА////////////////////
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");
let popupFormTitle = document.querySelector(".form__field_title");
let popupFormSubtitle = document.querySelector(".form__field_subtitle");
let popupEditProfileForm = document.querySelector(".popup__form");
function handleSubmitTitleForm(e) {
  e.preventDefault();
  profileTitle.textContent = popupFormTitle.value;
  profileSubtitle.textContent = popupFormSubtitle.value;
}
popupEditProfileForm.addEventListener("submit", handleSubmitTitleForm);
