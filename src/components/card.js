import {
  ElementsTemplate,
  SectionElements,
  PopupBigImg,
  AddCaptionFormTitle,
  AddImgFormTitle,
  PopupElement,
  config,
  getmyID,
  ProfileTitle
} from "../index.js";
import { openPopup, closePopup } from "./modal.js";
/////////////////////////////////////Функция для создания и возвращения карточки///////////////////////////////////

export function buildcard(element, userId) {
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
  PlaceElement.id = element._id;
  //Повесили слушателя на изображение на открытие попапа
  PlaceImg.addEventListener("click", function () {
    openPopup(PopupBigImg);
    const BigImg = document.querySelector(".img-popup__figure");
    BigImg.src = PlaceImg.src;
    const BigCaption = document.querySelector(".img-popupтз__caption");
    BigCaption.textContent = element.name;
  });
  // Нашли кнопку удаления
  const ImgDeleteButton = PlaceElement.querySelector(
    ".elements__delete-button"
  );
  //Удалили ненужные кнопки, повесили слушателей на нужные.
  removeDeleteButton(ImgDeleteButton, userId, element.owner._id, PlaceElement.id);
   //Нашли кнопку лайка
  const LikeButton = PlaceElement.querySelector(".elements__heart-button");
  //Повесили слушателя на лайк:
  myLikesUpdate(element.likes, userId, LikeButton);
  LikeButton.addEventListener("click", function () {cardLike(PlaceElement.id,LikeButton, LikesCount)});
     //Нашли счетчик лайков
  const LikesCount = PlaceElement.querySelector(".elements__likes-count");
  LikesCount.textContent = element.likes.length;
  return PlaceElement;
}
//Функция добавления карты в верстку
export function createCard(element, ID) {
  const card = buildcard(element, ID);
  SectionElements.prepend(card);
}
//Добавляем карту из попапа:
export function addNewCard(e) {
  e.preventDefault();
  apiAddCardPost(AddImgFormTitle.value, AddCaptionFormTitle.value);
}
///////////////////////Функция добавления одной карточки:
function apiAddCardPost(name, link) {
  fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      createCard(res, res.owner._id);
      closePopup(PopupElement);
    });
}
//////////////Удаление и слушатель кнопки Delete
function removeDeleteButton(ImgDeleteButton, userId, ownerID, cardID) {
  if (userId != ownerID) {
    ImgDeleteButton.remove();
  } else {
    ImgDeleteButton.addEventListener("click", function () {
      apiCardDelite(cardID) 
    });
  }
}
///Удаление карточки из Delete
export function apiCardDelite(cardID) {
  fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return res.json();
  })
  .then((res) => {
    const deletingCard = document.getElementById(`${cardID}`)
    deletingCard.remove()});
  }
/// Отображение лайка если юзер уже лайкал:

///Удаление/добавление лайка
function cardLike(cardID, LikeButton) {
  if (LikeButton.classList.contains("elements__heart-button_active")) {
    apiLikeDelete(cardID, LikeButton);}
    else 
    {apiLikeAdd(cardID, LikeButton)};
  }

function apiLikeAdd(cardID, LikeButton) {
  fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: config.headers,
  })

  .then((res) => {
  LikeButton.classList.add("elements__heart-button_active");
   return res.json(); })
  .then((res) => {updateLikeCount(res.likes.length, cardID)});
}

function apiLikeDelete(cardID, LikeButton) {
  fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  })

  .then((res) => {
  LikeButton.classList.remove("elements__heart-button_active");
  return res.json();
  })

  .then((res) => {updateLikeCount(res.likes.length, cardID)});
}

function myLikesUpdate (cardLikes, myId, LikeButton) {
  if (cardLikes.some(like => like._id === myId)) {
   LikeButton.classList.add("elements__heart-button_active");
     }
}

function updateLikeCount (newLikeCount, cardID) {
  const cardForLikesUpdate = document.getElementById(`${cardID}`);
  const LikesCountForUpdate = cardForLikesUpdate.querySelector(".elements__likes-count");
  LikesCountForUpdate.textContent = newLikeCount;
}

