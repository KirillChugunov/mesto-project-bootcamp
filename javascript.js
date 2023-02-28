const popuprofile = document.querySelector(".popup__profile-edit");
const buttoneditProfile = document.querySelector(".profile__edit-button");
const editProfileclosebutton = document.querySelector(".popup__close_edit-profile");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupFormTitle = document.querySelector(".form__field_profile_title");
const popupFormSubtitle = document.querySelector(".form__field_profile_subtitle");
const buttonAddprofile = document.querySelector(".profile__add-button");
const popupelement = document.querySelector(".popup__add-element");
const popupeditclosebutton = document.querySelector (".popup__close_edit-profile");
const popupelementclosebutton = document.querySelector (".popup__close_add-element");
const popupEditProfileForm = document.querySelector(".profile_popup_form");
const popupBigImg = document.querySelector(".img-popup");

////////////////////Функция открытия попапа////////////////////
function openPopup(popup) {
  popup.classList.add("popup_opened");
};
////////////////////Функция закрытия попапа/////////////////////////
function closePopup(popup) {
  popup.classList.remove("popup_opened");
};


/////////////////////ВЫЗОВ ПЕРВОГО ПОПАПА////////////////////////////
buttoneditProfile.addEventListener("click", function(){
  openPopup(popuprofile);
  popupFormTitle.value = profileTitle.textContent;
  popupFormSubtitle.value = profileSubtitle.textContent;
});
/////////////////////////ВЫЗОВ ВТОРОГО ПОПАПА//////////////////////////
buttonAddprofile.addEventListener("click", function(){
  openPopup(popupelement);
})
/////////////////////////ЗАКРЫТИЕ ПЕРВОГО ПОПАПА/////////////////////////
popupeditclosebutton.addEventListener("click",function() {
  closePopup(popuprofile);
})

/////////////////////////ЗАКРЫТИЕ ВТОРОГО ПОПАПА/////////////////////////
popupelementclosebutton.addEventListener("click",function() {
  closePopup(popupelement);
})
//////////////////////////САМБИТ ПЕРВОГО ПОПАПА////////////////////////////
function handleSubmitTitleForm (e) {
  e.preventDefault();
  profileTitle.textContent = popupFormTitle.value;
  profileSubtitle.textContent = popupFormSubtitle.value;
  closePopup(popuprofile);
}

popupEditProfileForm.addEventListener("submit",handleSubmitTitleForm);

//////////////////ДОБАВЛЕНИЕ ИЗОБРАЖЕНИЙ/////////////////////////

// МАССИВ С ФОТО И ССЫЛКАМИ
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },

  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];


// Нашли секцию Elements:
const sectionElements = document.querySelector(".elements");
// Нашли заготовку:
const elementsTemplate = document.querySelector("#element__template").content;
//Создаем функцию для создания и возвращения карточки
function buildcard(element) {
  //Клонировали заготовку
  const placeElement = elementsTemplate.querySelector(".elements__card").cloneNode(true);
  //Заполнили название фото
  placeElement.querySelector(".elements__caption").textContent = element.name;
  //Нашли фото в карточке:
  const placeimg = placeElement.querySelector(".elements__photo");
  //Заполнили фото и атрибут alt
  placeimg.src = element.link;
  placeimg.alt = placeElement.textContent;
  //Повесили слушателя на изображение на открытие попапа
  placeimg.addEventListener("click",function(){
   console.log("i am alive2")
   openPopup(popupBigImg);
   const bigimg = document.querySelector(".img-popup__figure");
   bigimg.src = placeimg.src;
   const bigcaption = document.querySelector(".img-popup__caption");
   bigcaption.textContent = element.name;  
  });
   // Нашли кнопку удаления
   const imgdeletebutton = placeElement.querySelector(".elements__delete-button");
   //Повесили слушателя на удаление:
   imgdeletebutton.addEventListener('click', function () {
     const carditem = imgdeletebutton.closest('.elements__card');
     carditem.remove();
   }); 
  return placeElement;
}

const placeimgclosebutton = document.querySelector(".img-popup__close");
placeimgclosebutton.addEventListener("click",function(){
  closePopup(popupBigImg);
 });

//Функция добавления карты в верстку
function createCard(element) {
  const card = buildcard(element);
  sectionElements.prepend(card);
}

//Добавляем карты из массива:
function gridBuilder() {
   initialCards.forEach(createCard);
}
gridBuilder()
//Работает!!!!!
const addimgFormTitle = document.querySelector(".form__field_elements_title")
const addCaptionFormTitle = document.querySelector(".form__field_elements_subtitle")

function addNewCard(e) {
  e.preventDefault();
    const card = {
    name: addimgFormTitle.value,
    link: addCaptionFormTitle.value,
  }
  createCard(card)
  console.log("I AM ALIVE!!!1")
  closePopup(popupelement);
 }
const addimgbutton = document.querySelector(".elemnt__submit")
popupelement.addEventListener("submit",addNewCard);

// Функция удаления карточки:
  // Нашли кнопку удаления
  const imgdeletebutton = document.querySelector(".elements__delete-button");
  //Повесили слушателя на удаление:
  imgdeletebutton.addEventListener('click', function () {
    const carditem = imgdeletebutton.closest('.elements__card');
    carditem.remove();
  }); 










