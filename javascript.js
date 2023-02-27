//////////////////////////ПЕРВЫЙ ПОПАП///////////////////////////////////////
/////////////ВЫЗОВ ПОПАПА ПРОФИЛЯ//////////////
const buttoneditProfile = document.querySelector(".profile__edit-button");
function openPopupProfile() {
  popupFormTitle.value = profileTitle.textContent;
  popupFormSubtitle.value = profileSubtitle.textContent;
  const popuprofile = document.querySelector(".popup__profile-edit");
  popuprofile.classList.add("popup_opened");
}
buttoneditProfile.addEventListener("click", openPopupProfile);
////////////ЗАКРЫТИЕ ПОПАПА ПРОФИЛЯ/////////////////////
const editProfileclosebutton = document.querySelector(".popup__close_edit-profile");
function closePopupProfile() {
  const popup = document.querySelector(".popup__profile-edit");
  popup.classList.remove("popup_opened");
}
editProfileclosebutton.addEventListener("click", closePopupProfile);
///////////////////НАПОЛНЕНИЕ ПОПАПА////////////////////
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");
let popupFormTitle = document.querySelector(".form__field_profile_title");
let popupFormSubtitle = document.querySelector(".form__field_profile_subtitle");
let popupEditProfileForm = document.querySelector(".profile_popup_form");
function handleSubmitTitleForm(e) {
  e.preventDefault();
  profileTitle.textContent = popupFormTitle.value;
  profileSubtitle.textContent = popupFormSubtitle.value;
}
popupEditProfileForm.addEventListener("submit", handleSubmitTitleForm);

///////////////////////////////ВТОРОЙ ПОПАП/////////////////////////////////////////
/////////////ВЫЗОВ ПОПАПА ПРОФИЛЯ/////////////
const buttonAddprofile = document.querySelector(".profile__add-button");

function openPopupElements() {
  const popup = document.querySelector(".popup__add-element");
  popup.classList.add("popup_opened");
}
buttonAddprofile.addEventListener("click", openPopupElements);

////////////ЗАКРЫТИЕ ПОПАПА ПРОФИЛЯ/////////////////////
const addElemntclosebutton = document.querySelector(".popup__close_add-element");
function closePopupAddElement() {
  const popupelement = document.querySelector(".popup__add-element");
  popupelement.classList.remove("popup_opened");
}
addElemntclosebutton.addEventListener("click", closePopupAddElement);