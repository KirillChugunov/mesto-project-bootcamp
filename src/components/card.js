import {
  initialCards,
  ElementsTemplate,
  SectionElements,
  PopupBigImg,
  AddCaptionFormTitle,
  AddImgFormTitle,
  PopupElement,
} from "../index.js";
import { openPopup, closePopup } from "./modal.js";
/////////////////////////////////////Функция для создания и возвращения карточки///////////////////////////////////
export function buildcard(element) {
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
  return PlaceElement;
}

//Функция добавления карты в верстку
export function createCard(element) {
  const card = buildcard(element);
  SectionElements.prepend(card);
}

//Добавляем карты из массива:
export function gridBuilder() {
  initialCards.forEach(createCard);
}
//Добавляем карту из попапа:
export function addNewCard(e) {
  e.preventDefault();
  const card = {
    name: AddImgFormTitle.value,
    link: AddCaptionFormTitle.value,
  };
  createCard(card);
  closePopup(PopupElement);
}
