import {
  elementsTemplate,
  sectionElements,
  popupBigImg,
} from "./data.js";
import { openPopup} from "./modal.js";
import {
  removeDeleteButton,
  myLikesUpdate,
  cardLikeTogle,
} from "./api.js";
/////////////////////////////////////Функция для создания и возвращения карточки///////////////////////////////////

export function buildCard(element, userId) {
  //Клонировали заготовку
  const PlaceElement = elementsTemplate
    .querySelector(".elements__card")
    .cloneNode(true);
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
    openPopup(popupBigImg);
    const BigImg = document.querySelector(".img-popup__figure");
    BigImg.src = PlaceImg.src;
    BigImg.alt = `${PlaceImg.alt}-img`;
    const BigCaption = document.querySelector(".img-popup__caption");
    BigCaption.textContent = element.name;
  });
  // Нашли кнопку удаления
  const ImgDeleteButton = PlaceElement.querySelector(
    ".elements__delete-button"
  );
  //Удалили ненужные кнопки, повесили слушателей на нужные.
  removeDeleteButton(
    ImgDeleteButton,
    userId,
    element.owner._id,
    PlaceElement.id
  );
  //Нашли кнопку лайка
  const LikeButton = PlaceElement.querySelector(".elements__heart-button");
  //Повесили слушателя на лайк:
  myLikesUpdate(element.likes, userId, LikeButton);
  LikeButton.addEventListener("click", function () {
    cardLikeTogle(PlaceElement.id, LikeButton, LikesCount);
  });
  //Нашли счетчик лайков
  const LikesCount = PlaceElement.querySelector(".elements__likes-count");
  LikesCount.textContent = element.likes.length;
  return PlaceElement;
}
//Функция добавления карты в верстку
export function createCard(element, ID) {
  const card = buildCard(element, ID);
  sectionElements.prepend(card);
}

