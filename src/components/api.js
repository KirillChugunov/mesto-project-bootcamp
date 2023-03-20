<<<<<<< HEAD
///Конфиг для передачи токена
=======
>>>>>>> develop
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
<<<<<<< HEAD
///Изменение текста кнопки загрузки страницы
export function renderLoading(isLoading, popup) {
=======
export function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  console.log("я отработал")
>>>>>>> develop
  if (isLoading) {
    button.textContent = loadingText
  } else {
    button.textContent = buttonText
  }
}
///Загрузка информации о профиле пользователя при инициализации странцы
export function profilePreloadOnStart() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => checkResponse(res))
}
///Получение массива карточек со страницы
export function getCardsFromApi() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => checkResponse(res))
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

<<<<<<< HEAD
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
=======
///Удаление карточки с сервера
>>>>>>> develop
export function apiCardDelete(cardID) {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  })
   .then((res) => checkResponse(res))
}

///Добавили лайк чере api
export function apiLikeAdd(cardID, LikeButton) {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: config.headers,
  })
  .then((res) => checkResponse(res))
}
///Убрали лайк через API
export function apiLikeDelete(cardID, LikeButton) {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then((res) => checkResponse(res))
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
<<<<<<< HEAD
}
=======
  }
>>>>>>> develop
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

