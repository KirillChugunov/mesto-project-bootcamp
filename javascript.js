/////////////////Переменные/////////////////////////////////////
const PopuProfile = document.querySelector(".popup__profile-edit");
const ButtonEditProfile = document.querySelector(".profile__edit-button");
const EditProfileCloseButton = document.querySelector(
  ".popup__close_edit-profile"
);
const ProfileTitle = document.querySelector(".profile__title");
const ProfileSubtitle = document.querySelector(".profile__subtitle");
const PopupFormTitle = document.querySelector(".form__field_profile_title");
const PopupFormSubtitle = document.querySelector(
  ".form__field_profile_subtitle"
);
const ButtonAddProfile = document.querySelector(".profile__add-button");
const PopupElement = document.querySelector(".popup__add-element");
const PopupEditCloseButton = document.querySelector(
  ".popup__close_edit-profile"
);
const PopupElementCloseButton = document.querySelector(
  ".popup__close_add-element"
);
const PopupEditProfileForm = document.querySelector(".profile_popup_form");
const PopupBigImg = document.querySelector(".img-popup");
const SectionElements = document.querySelector(".elements");
const ElementsTemplate = document.querySelector("#element__template").content;
const PlaceImgCloseButton = document.querySelector(".img-popup__close");
const AddImgFormTitle = document.querySelector(".form__field_elements_title");
const AddCaptionFormTitle = document.querySelector(
  ".form__field_elements_subtitle"
);
const AddImgbutton = document.querySelector(".elemnt__submit");

////////////////////Функция открытия попапа////////////////////
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
////////////////////Функция закрытия попапа/////////////////////////
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

/////////////////////ВЫЗОВ ПЕРВОГО ПОПАПА////////////////////////////
ButtonEditProfile.addEventListener("click", function () {
  openPopup(PopuProfile);
  PopupFormTitle.value = ProfileTitle.textContent;
  PopupFormSubtitle.value = ProfileSubtitle.textContent;
});
/////////////////////////ВЫЗОВ ВТОРОГО ПОПАПА//////////////////////////
ButtonAddProfile.addEventListener("click", function () {
  openPopup(PopupElement);
});
/////////////////////////ЗАКРЫТИЕ ПЕРВОГО ПОПАПА/////////////////////////
PopupEditCloseButton.addEventListener("click", function () {
  closePopup(PopuProfile);
});

/////////////////////////ЗАКРЫТИЕ ВТОРОГО ПОПАПА/////////////////////////
PopupElementCloseButton.addEventListener("click", function () {
  closePopup(PopupElement);
});
//////////////////////////САМБИТ ПЕРВОГО ПОПАПА////////////////////////////
function handleSubmitTitleForm(e) {
  e.preventDefault();
  ProfileTitle.textContent = PopupFormTitle.value;
  ProfileSubtitle.textContent = PopupFormSubtitle.value;
  closePopup(PopuProfile);
}

PopupEditProfileForm.addEventListener("submit", handleSubmitTitleForm);

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

//////////////////////////////////////Функция для создания и возвращения карточки///////////////////////////////////
function buildcard(element) {
  //Клонировали заготовку
  const PlaceElement =
    ElementsTemplate.querySelector(".elements__card").cloneNode(true);
  //Заполнили название фото
  PlaceElement.querySelector(".elements__caption").textContent = element.name;
  //Нашли фото в карточке:
  const PlaceImg = PlaceElement.querySelector(".elements__photo");
  //Заполнили фото и атрибут alt
  PlaceImg.src = element.link;
  PlaceImg.alt = PlaceElement.textContent;
  //Повесили слушателя на изображение на открытие попапа
  PlaceImg.addEventListener("click", function () {
    console.log("i am alive2");
    openPopup(PopupBigImg);
    const BigImg = document.querySelector(".img-popup__figure");
    BigImg.src = PlaceImg.src;
    const BigCaption = document.querySelector(".img-popup__caption");
    BigCaption.textContent = element.name;
  });
  // Нашли кнопку удаления
  const ImgDeleteButton = PlaceElement.querySelector(
    ".elements__delete-button"
  );
  //Повесили слушателя на удаление:
  ImgDeleteButton.addEventListener("click", function () {
    const CardItem = ImgDeleteButton.closest(".elements__card");
    CardItem.remove();
  });
  //Нашли кнопку лайка
  const LikeButton = PlaceElement.querySelector(".elements__heart-button");
  //Повесили слушателя на лайк:
  LikeButton.addEventListener("click", function () {
    LikeButton.classList.toggle("elements__heart-button_active");
    console.log("i am alive");
  });
  return PlaceElement;
}

PlaceImgCloseButton.addEventListener("click", function () {
  closePopup(PopupBigImg);
});

//Функция добавления карты в верстку
function createCard(element) {
  const card = buildcard(element);
  SectionElements.prepend(card);
}

//Добавляем карты из массива:
function gridBuilder() {
  initialCards.forEach(createCard);
}
gridBuilder();
//Работает!!!!!

function addNewCard(e) {
  e.preventDefault();
  const card = {
    name: AddImgFormTitle.value,
    link: AddCaptionFormTitle.value,
  };
  createCard(card);
  console.log("I AM ALIVE!!!1");
  closePopup(PopupElement);
}
PopupElement.addEventListener("submit", addNewCard);
