import {
  elementsTemplate,
  sectionElements,
  popupBigImg,
  bigImg,
  bigCaption
} from "./data.js";
import { openPopup} from "./modal.js";
import {
  apiCardDelete,
  apiLikeAdd,
  apiLikeDelete
} from "./api.js";
/////////////////////////////////////Функция для создания и возвращения карточки///////////////////////////////////

export function buildCard(element, userId) {
  //Клонировали заготовку
  const placeElement = elementsTemplate
    .querySelector(".elements__card")
    .cloneNode(true);
  //Заполнили название фото
  placeElement.querySelector(".elements__caption").textContent = element.name;
  //Нашли фото в карточке:
  const placeImg = placeElement.querySelector(".elements__photo");
  //Заполнили фото и атрибут alt
  placeImg.src = element.link;
  placeImg.alt = placeElement.textContent;
  placeElement.id = element._id;
  //Повесили слушателя на изображение на открытие попапа
  placeImg.addEventListener("click", function () {
    openPopup(popupBigImg);
    bigImg.src = placeImg.src;
    bigImg.alt = `${placeImg.alt}-img`;
    bigCaption.textContent = element.name;
  });
  // Нашли кнопку удаления
  const imgDeleteButton = placeElement.querySelector(
    ".elements__delete-button"
  );
  //Удалили ненужные кнопки, повесили слушателей на нужные.
  removeDeleteButton(
    imgDeleteButton,
    userId,
    element.owner._id,
    placeElement.id
  );
  //Нашли кнопку лайка
  const likeButton = placeElement.querySelector(".elements__heart-button");
  //Повесили слушателя на лайк:
  myLikesUpdate(element.likes, userId, likeButton);
  likeButton.addEventListener("click", function () {
    cardLikeTogle(placeElement.id, likeButton, likesCount);
  });
  //Нашли счетчик лайков
  const likesCount = placeElement.querySelector(".elements__likes-count");
  likesCount.textContent = element.likes.length;
  return placeElement;
}
//Функция добавления карты в верстку
export function createCard(element, ID) {
  const card = buildCard(element, ID);
  sectionElements.prepend(card);
}

////////Функция добавления слушателя/удаления ненужных кнопок для кнопок Delete
function removeDeleteButton(imgDeleteButton, userId, ownerID, cardID) {
  if (userId != ownerID) {
    imgDeleteButton.remove();
  } else {
    imgDeleteButton.addEventListener("click", function () {
      apiCardDelete(cardID)
      .then((res) => {
        const deletingCard = document.getElementById(`${cardID}`);
        deletingCard.remove();
      })
      .catch((error) => console.log(`${error} - ошибка`))
    })
  }
}

///Удаление/добавление лайка
export function cardLikeTogle(cardID, likeButton) {
  if (likeButton.classList.contains("elements__heart-button_active")) {
    apiLikeDelete(cardID, likeButton)
    .then((res) => {
      likeButton.classList.remove("elements__heart-button_active");
      updateLikeCount(res.likes.length, cardID);
    })
    .catch((error) => console.log(`${error} - ошибка`))   
  } else {
    apiLikeAdd(cardID, likeButton)
    .then((res) => {
      likeButton.classList.add("elements__heart-button_active");
      updateLikeCount(res.likes.length, cardID);
    })
    .catch((error) => console.log(`${error} - ошибка`))   
  }
}
///Функция проверки наличия моего лайка на карточке
function myLikesUpdate(cardLikeTogles, myId, likeButton) {
  if (cardLikeTogles.some((like) => like._id === myId)) {
    likeButton.classList.add("elements__heart-button_active");
  }
}

///Обновление лайков при загрузке
function updateLikeCount(newLikeCount, cardID) {
  const cardForLikesUpdate = document.getElementById(`${cardID}`);
  const likesCountForUpdate = cardForLikesUpdate.querySelector(
    ".elements__likes-count");
  likesCountForUpdate.textContent = newLikeCount;
}