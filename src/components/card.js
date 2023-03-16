import {
  ElementsTemplate,
  SectionElements,
  PopupBigImg,
  AddCaptionFormTitle,
  AddImgFormTitle,
  PopupElement,
  config,
} from "../index.js";
import { openPopup, closePopup } from "./modal.js";
/////////////////////////////////////Функция для создания и возвращения карточки///////////////////////////////////

export function buildcard(element) {
  //Клонировали заготовку
  const PlaceElement = ElementsTemplate.querySelector(".elements__card").cloneNode(true);
  //Заполнили название фото
  PlaceElement.querySelector(".elements__caption").textContent = element.name;
  //Нашли фото в карточке:
  const PlaceImg = PlaceElement.querySelector(".elements__photo");
  //Заполнили фото и атрибут alt
  PlaceImg.src = element.link;
  PlaceImg.alt = PlaceElement.textContent;
  //Повесили слушателя на изображение на открытие попапа
  PlaceImg.addEventListener("click", function () {
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
  });
  //Нашли счетчик лайков
  const LikesCount = PlaceElement.querySelector(".elements__likes-count");
  LikesCount.textContent = element.likes.length;
  return PlaceElement;
}

//Функция добавления карты в верстку
export function createCard(element) {
  const card = buildcard(element);
  SectionElements.prepend(card);
}

//Добавляем карту из попапа:
export function addNewCard(e) {
  e.preventDefault();
  apiAddCardPost(AddImgFormTitle.value, AddCaptionFormTitle.value)
  closePopup(PopupElement);
}


///////////////////////Функция добавления одной карточки:
function apiAddCardPost(name, link) {
  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify ({
      name: name,
      link: link
    })
   })
 .then((res) => {
   return res.json()
})
 .then((res) => {
  const card = {
    name: res.name,
    link: res.link
  }
  createCard(card);
  })
  .catch((reg) => {console.log(reg)});
}

//проверка ID пользователя
function checkIdForRemoveDeleteButton(ownerid, deletebutton) {
  // console.log(myid)
  // console.log(ownerid)
  const myid = returnMyProfileID;
  if (myid != ownerid) {
    deletebutton.remove
    // console.log("id не совпал")
  }
  else {console.log ("id совпал")}
};

