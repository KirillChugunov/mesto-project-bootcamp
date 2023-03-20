///Конфиг для передачи токена
export const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wbf-cohort-6",
  headers: {
    authorization: "d1f78d2c-b56d-404a-8b1d-91f3bcf47ed4",
    "Content-Type": "application/json",
  },
};
//Проверка ответа от сервера
export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res.status} - error`);
}
///Изменение текста кнопки загрузки страницы
export function renderLoading(isLoading, popup) {
  if (isLoading) {
    popup.querySelector(".popup__submit").textContent = "Сохранение...";
  } else {
    popup.querySelector(".popup__submit").textContent = "Сохранить";
  }
}
///Загрузка информации о профиле пользователя при инициализации странцы
export function profilePreloadOnStart() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => checkResponse(res))
  .catch((error) => console.log(`${error} - ошибка`))
}
///Получение массива карточек со страницы
export function getCardsFromApi() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    return res.json();
  });
}
///Добавление карточки на сервер
export function apiAddCardPost(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
   .then((res) => checkResponse(res))
}

//////////////Удаление и слушатель кнопки Delete
export function removeDeleteButton(ImgDeleteButton, userId, ownerID, cardID) {
  if (userId != ownerID) {
    ImgDeleteButton.remove();
  } else {
    ImgDeleteButton.addEventListener("click", function () {
      apiCardDelete(cardID);
    })
  }
}
///Удаление карточки из Delete
export function apiCardDelete(cardID) {
  fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  })
   .then((res) => checkResponse(res))
    .then((res) => {
      const deletingCard = document.getElementById(`${cardID}`);
      deletingCard.remove();
    })
    .catch((error) => console.log(`${error} - ошибка`))
}
/// Отображение лайка если юзер уже лайкал:

///Удаление/добавление лайка
export function cardLikeTogle(cardID, LikeButton) {
  if (LikeButton.classList.contains("elements__heart-button_active")) {
    apiLikeDelete(cardID, LikeButton);
  } else {
    apiLikeAdd(cardID, LikeButton);
  }
}
///Добавили лайк чере api
function apiLikeAdd(cardID, LikeButton) {
  fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      LikeButton.classList.add("elements__heart-button_active");
      return res.json();
    })
    .then((res) => {
      updateLikeCount(res.likes.length, cardID);
    })
    .catch((error) => console.log(`${error} - ошибка`))   
}
///Убрали лайк через API
function apiLikeDelete(cardID, LikeButton) {
  fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      LikeButton.classList.remove("elements__heart-button_active");
      return res.json();
    })

    .then((res) => {
      updateLikeCount(res.likes.length, cardID);
    })
    .catch((error) => console.log(`${error} - ошибка`))   
  }
///Проверка моего лайка
export function myLikesUpdate(cardLikeTogles, myId, LikeButton) {
  if (cardLikeTogles.some((like) => like._id === myId)) {
    LikeButton.classList.add("elements__heart-button_active");
  }
}
///Обновление лайков при загрузке
function updateLikeCount(newLikeCount, cardID) {
  const cardForLikesUpdate = document.getElementById(`${cardID}`);
  const LikesCountForUpdate = cardForLikesUpdate.querySelector(
    ".elements__likes-count"
  );
  LikesCountForUpdate.textContent = newLikeCount;
}
////Изменение профиля
export function apiProfilePatch(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
   .then((res) => checkResponse(res))
}
////Изменение автара
export function apiAvatarPatch(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  })
   .then((res) => checkResponse(res))
}

